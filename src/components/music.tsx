import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import * as styles from '../styles/modules/music.module.scss';
import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';

type HowlType = typeof Howl;

const songs = [
	{
		title: 'Samba',
		artist: 'Eternity Percussion',
		src: samba,
	},
	{
		title: 'Afro-Samba',
		artist: 'Eternity Percussion',
		src: afrosamba,
	},
];

const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const [seconds, setSeconds] = useState<number | null>(0);
	const [duration, setDuration] = useState<number | null>(0);

	const soundRef = React.useRef<HowlType | null>(null);

	let play: () => void;
	let pause: () => void;

	useEffect(() => {
		const sound = soundRef.current;

		if (sound) {
			if (isPlaying) {
				const storedPosition = soundRef.current?.seek();
				const currentTime = storedPosition || 0;
				sound.seek(currentTime);
				sound.play();

				// Update the current time smoothly
				const updateCurrentTime = () => {
					const currentTime = sound.seek();
					setSeconds(currentTime);
					if (currentTime < (duration || 0)) {
						requestAnimationFrame(updateCurrentTime);
					}
				};
				updateCurrentTime();
			}
		} else {
			const newSound = new Howl({
				src: [songs[currentSong].src],
				onend: () => {
					setIsPlaying(false);
					setSeconds(0); // Reset seconds to 0 when the song ends
				},
				onload: () => {
					const storedPosition = soundRef.current?.seek();
					soundRef.current?.seek(storedPosition);
					setDuration(newSound.duration());
					setSeconds(storedPosition || 0);
					if (isPlaying) {
						play();
					}
				},
			});
			soundRef.current = newSound;
		}

		return () => {
			if (sound && isPlaying) {
				sound.pause(); // Pause but don't stop the sound when unmounting
			}
		};
	}, [isPlaying, currentSong, duration]);

	play = () => {
		const sound = soundRef.current;
		if (sound) {
			sound.play();
			setIsPlaying(true);
		}
	};

	pause = () => {
		const sound = soundRef.current;
		if (sound && isPlaying) {
			sound.pause();
			setIsPlaying(false);
		}
	};

	const prevSong = () => {
		if (isPlaying) {
			soundRef.current?.stop();
		}

		const prevSongIndex = (currentSong - 1 + songs.length) % songs.length;
		setCurrentSong(prevSongIndex);
		play();
		setSeconds(0); // Reset seconds to 0

		// Update the source of the sound
		soundRef.current = new Howl({
			src: [songs[prevSongIndex].src],
			onend: () => {
				setIsPlaying(false);
				setSeconds(0);
			},
			onload: () => {
				if (isPlaying) {
					play();
				}
				setDuration(soundRef.current?.duration() || null);
			},
		});
	};

	const nextSong = () => {
		if (isPlaying) {
			soundRef.current?.stop();
		}

		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
		play();
		setSeconds(0); // Reset seconds to 0

		// Update the source of the sound
		soundRef.current = new Howl({
			src: [songs[nextSongIndex].src],
			onend: () => {
				setIsPlaying(false);
				setSeconds(0);
			},
			onload: () => {
				if (isPlaying) {
					play();
				}
				setDuration(soundRef.current?.duration() || null);
			},
		});
	};

	const formatTime = (time: number | null) => {
		if (time === null) {
			return '0:00';
		}
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

	console.log('isPlaying', isPlaying);
	console.log('currentSong', currentSong);
	console.log('seconds', seconds);
	console.log('duration', duration);

	return (
		<div className={styles.component}>
			<img
				className={styles.albumCover}
				src='https://picsum.photos/200/200'
				alt='Album Cover'
			/>
			<div>
				<h3 className={styles.title}>{songs[currentSong].title}</h3>
				<p className={styles.subTitle}>{songs[currentSong].artist}</p>
			</div>
			<div className={styles.controls}>
				<button className={styles.controlButton} onClick={prevSong}>
					<i className='fas fa-step-backward'></i>
				</button>
				{isPlaying ? (
					<button className={styles.controlButton} onClick={pause}>
						<i className='fas fa-pause-circle'></i>
					</button>
				) : (
					<button className={styles.controlButton} onClick={play}>
						<i className='fas fa-play-circle'></i>
					</button>
				)}
				<button className={styles.controlButton} onClick={nextSong}>
					<i className='fas fa-step-forward'></i>
				</button>
			</div>
			<div className={styles.time}>
				<p>
					{formatTime(seconds)}
					{duration !== null && <span> / {formatTime(duration)}</span>}
				</p>
			</div>
			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={duration || 0}
					value={seconds || 0}
					onChange={(e) => {
						if (soundRef.current) {
							const newTime = Number(e.target.value);
							soundRef.current.seek(newTime);
							setSeconds(newTime);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
