import React, { useEffect, useState, useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import albumCover from "../../images/logo/ep-logo-small.png";

import * as styles from "../../styles/modules/components/musicplayer.module.scss";

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const audioElementRefs = useRef<Array<HTMLAudioElement | null>>([]);

    const data = useStaticQuery(graphql`
        query {
            allS3MusicFile {
                edges {
                    node {
                        id
                        title
                        src
                    }
                }
            }
        }
    `);

    const formatTitle = (title: string) => {
        return title.substring(3).replace(".mp3", "").replace(/[_-]/g, " ");
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    };

    const songs = data.allS3MusicFile.edges.map(({ node }: any) => ({
        src: node.src,
        title: formatTitle(node.title),
        artist: "Eternity Percussion",
    }));

    useEffect(() => {
        const audioElement = audioElementRefs.current[currentSong];

        if (!audioElement && songs[currentSong]) {
            audioElementRefs.current[currentSong] = new Audio(
                songs[currentSong].src
            );
            audioElementRefs.current[currentSong]?.addEventListener(
                "ended",
                switchToNextSong
            );
            audioElementRefs.current[currentSong]?.addEventListener(
                "canplay",
                () => {
                    setIsLoaded(true);
                    setDuration(
                        audioElementRefs.current[currentSong]!.duration
                    );
                }
            );
        }

        audioElementRefs.current[currentSong]?.addEventListener(
            "timeupdate",
            () => {
                if (audioElementRefs.current[currentSong]) {
                    setCurrentTime(
                        audioElementRefs.current[currentSong]!.currentTime
                    );
                }
            }
        );

        if ("mediaSession" in navigator && songs[currentSong]) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: songs[currentSong].title,
                artist: songs[currentSong].artist,
                album: "Eternity Percussion",
                artwork: [
                    {
                        src: albumCover,
                        sizes: "48x48",
                        type: "image/png",
                    },
                ],
            });

            navigator.mediaSession.setActionHandler("play", play);
            navigator.mediaSession.setActionHandler("pause", pause);
            navigator.mediaSession.setActionHandler("previoustrack", () => {
                audioElementRefs.current[currentSong]?.pause();
                if (
                    audioElementRefs.current[currentSong] &&
                    audioElementRefs.current[currentSong]!.currentTime > 10
                ) {
                    audioElementRefs.current[currentSong]!.currentTime = 0;

                    if (isPlaying) {
                        audioElementRefs.current[currentSong]?.play();
                    }
                } else {
                    const prevSongIndex =
                        currentSong === 0 ? songs.length - 1 : currentSong - 1;
                    audioElementRefs.current[currentSong]!.currentTime = 0;
                    setCurrentSong(prevSongIndex);
                    setCurrentTime(0);
                }
            });
            navigator.mediaSession.setActionHandler("nexttrack", () => {
                const nextSongIndex = (currentSong + 1) % songs.length;
                audioElementRefs.current[currentSong]?.pause();
                audioElementRefs.current[currentSong]!.currentTime = 0;
                setCurrentSong(nextSongIndex);
                setCurrentTime(0);
            });
            navigator.mediaSession.setActionHandler("seekto", (event) => {
                const seekTime = event.seekTime;
                if (
                    seekTime !== undefined &&
                    audioElementRefs.current[currentSong]
                ) {
                    audioElementRefs.current[currentSong]!.currentTime =
                        seekTime;
                    setCurrentTime(seekTime);
                }
            });
        }
    }, [currentSong, songs]);

    const switchToNextSong = () => {
        const nextSongIndex = (currentSong + 1) % songs.length;
        audioElementRefs.current[currentSong]?.pause();
        setCurrentSong(nextSongIndex);
        if (audioElementRefs.current[nextSongIndex]) {
            audioElementRefs.current[nextSongIndex]!.currentTime = 0;
        }
    };

    const play = () => {
        setIsPlaying(true);
        audioElementRefs.current[currentSong]
            ?.play()
            .catch((error) => console.error(error));
    };

    const pause = () => {
        setIsPlaying(false);
        audioElementRefs.current[currentSong]?.pause();
    };

    useEffect(() => {
        const audioElement = audioElementRefs.current[currentSong];

        if (isPlaying) {
            audioElement?.play().catch((error) => console.error(error));
        } else {
            audioElement?.pause();
        }

        if (audioElement) {
            audioElement.volume = volume / 100;
        }
    }, [isPlaying, currentSong, volume]);

    const loadMusic = () => {
        setIsLoaded(true);
        const audioElement = audioElementRefs.current[currentSong];
        if (audioElement) {
            setDuration(audioElement.duration);
        }
    };

    useEffect(() => {
        const audioElement = audioElementRefs.current[currentSong];

        if (audioElement) {
            setDuration(audioElement.duration);
        }
    }, [currentSong]);

    return (
        <div className={styles.musicPlayer}>
            {!isLoaded && (
                <>
                    <p className={styles.loadingTxt}>
                        Open muziekspeler
                        <button
                            onClick={loadMusic}
                            className={styles.loadingBtn}
                        >
                            <FontAwesomeIcon icon={"power-off"} />
                        </button>
                    </p>
                </>
            )}

            {isLoaded && (
                <div className={styles.musicInfo}>
                    <div className={styles.albumCover}>
                        <img src={albumCover} alt="Album Cover" />
                    </div>

                    <div className={styles.artistInfo}>
                        <h3 className={styles.title}>
                            {songs[currentSong]?.title}
                        </h3>
                        <p className={styles.track}>
                            {songs[currentSong]?.artist}
                        </p>
                    </div>
                </div>
            )}

            {isLoaded && (
                <div className={styles.controls}>
                    <button
                        className={styles.controlButton}
                        onClick={() => {
                            audioElementRefs.current[currentSong]?.pause();
                            if (
                                audioElementRefs.current[currentSong] &&
                                audioElementRefs.current[currentSong]!
                                    .currentTime > 10
                            ) {
                                audioElementRefs.current[
                                    currentSong
                                ]!.currentTime = 0;

                                if (isPlaying) {
                                    audioElementRefs.current[
                                        currentSong
                                    ]?.play();
                                }
                            } else {
                                const prevSongIndex =
                                    currentSong === 0
                                        ? songs.length - 1
                                        : currentSong - 1;
                                setCurrentSong(prevSongIndex);
                                if (audioElementRefs.current[prevSongIndex]) {
                                    audioElementRefs.current[
                                        prevSongIndex
                                    ]!.currentTime = 0;
                                }
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={"step-backward"} />
                    </button>
                    <button
                        className={styles.controlButton}
                        onClick={isPlaying ? pause : play}
                        id="music-button"
                    >
                        <FontAwesomeIcon
                            icon={isPlaying ? "pause-circle" : "play-circle"}
                        />
                    </button>
                    <button
                        className={styles.controlButton}
                        onClick={() => {
                            audioElementRefs.current[currentSong]?.pause();
                            const nextSongIndex =
                                (currentSong + 1) % songs.length;
                            setCurrentSong(nextSongIndex);
                            if (audioElementRefs.current[nextSongIndex]) {
                                audioElementRefs.current[
                                    nextSongIndex
                                ]!.currentTime = 0;
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={"step-forward"} />
                    </button>

                    <div className={styles.controlVolume}>
                        {volume === 0 && (
                            <button onClick={() => setVolume(100)}>
                                <FontAwesomeIcon icon={"volume-mute"} />
                            </button>
                        )}
                        {volume >= 1 && volume <= 49 && (
                            <button onClick={() => setVolume(100)}>
                                <FontAwesomeIcon icon={"volume-low"} />
                            </button>
                        )}
                        {volume >= 50 && volume <= 100 && (
                            <button onClick={() => setVolume(0)}>
                                <FontAwesomeIcon icon={"volume-high"} />
                            </button>
                        )}
                        <span>
                            {volume} <small>%</small>
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(event) =>
                                setVolume(parseInt(event.target.value, 10))
                            }
                        />
                    </div>
                </div>
            )}

            {isLoaded && (
                <>
                    <div className={styles.time}>
                        <span>{formatTime(currentTime)}</span>
                        <span>-{formatTime(duration - currentTime)}</span>
                    </div>

                    <div className={styles.timeline}>
                        <input
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={(e) => {
                                if (audioElementRefs.current[currentSong]) {
                                    const audioElement =
                                        audioElementRefs.current[currentSong];
                                    if (audioElement) {
                                        audioElement.currentTime = Number(
                                            e.target.value
                                        );
                                    }
                                }
                            }}
                        />
                    </div>
                </>
            )}

            {/* {isLoaded &&
				songs.map((song: any, index: number) => (
					<audio
						key={index}
						ref={(el) => {
							audioElementRefs.current[index] = el;
						}}
						src={song.src}
						onEnded={switchToNextSong}
					>
						<track kind="captions" />
					</audio>
				))} */}
        </div>
    );
};

export default MusicPlayer;
