import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';

import * as styles from '../styles/modules/music.module.scss';

import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';

type Howl = typeof Howl;

interface Song {
	title: string;
	artist: string;
	src: string;
}

const songs: Song[] = [
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
	// Add more songs to the list
];

const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const [seconds, setSeconds] = useState<number | null>(null);
	const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });

	const [playingSong, setPlayingSong] = useState<number | null>(null);

	const [sound, setSound] = useState<Howl | null>(null);
	const soundRef = React.useRef<Howl | null>(null);

	useEffect(() => {
		if (sound) {
			sound.stop();
		}
		const newSound = new Howl({
			src: [songs[currentSong].src],
			onend: () => {
				setIsPlaying(false);
				setCurrTime({ min: 0, sec: 0 });
				setSeconds(0);
				setPlayingSong(null); // Clear playingSong when the song ends
			},
		});
		setSound(newSound);
		soundRef.current = newSound;

		setSeconds(0);
		const duration = newSound.duration();
		setCurrTime({
			min: Math.floor(duration / 60),
			sec: Math.floor(duration % 60),
		});
	}, [currentSong]);

	const updateCurrentTime = () => {
		if (soundRef.current) {
			const currentTime = soundRef.current.seek() || 0;
			setSeconds(currentTime);

			const min = Math.floor(currentTime / 60);
			const sec = Math.floor(currentTime % 60);

			setCurrTime({
				min,
				sec,
			});
		}
	};

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (sound && isPlaying && playingSong !== null) {
			interval = setInterval(updateCurrentTime, 1000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [sound, isPlaying, playingSong]);

	const playingButton = () => {
		if (soundRef.current) {
			if (playingSong === currentSong) {
				if (soundRef.current.playing()) {
					soundRef.current.pause();
					setPlayingSong(null); // Pause the song and set playingSong to null
				} else {
					soundRef.current.play();
				}
			} else {
				soundRef.current.stop();
				const newSound = new Howl({
					src: [songs[currentSong].src],
					onend: () => {
						setIsPlaying(false);
						setCurrTime({ min: 0, sec: 0 });
						setSeconds(0);
						setPlayingSong(null); // Clear playingSong when the song ends
					},
					onload: () => {
						newSound.play();
						setIsPlaying(true);
						setSeconds(0);
						setCurrTime({ min: 0, sec: 0 });
						setPlayingSong(currentSong);
					},
				});
				setSound(newSound);
				soundRef.current = newSound;
			}
		}
	};

	const nextSong = () => {
		setCurrTime({ min: 0, sec: 0 });
		setCurrentSong((prevSong) => (prevSong + 1) % songs.length);
		setPlayingSong(null); // Clear playingSong when changing songs

		if (soundRef.current) {
			soundRef.current.stop();
			if (isPlaying) {
				const newSound = new Howl({
					src: [songs[(currentSong + 1) % songs.length].src],
					onend: () => {
						setIsPlaying(false);
						setCurrTime({ min: 0, sec: 0 });
						setSeconds(0);
					},
					onload: () => {
						if (soundRef.current) {
							soundRef.current.stop();
						}
						newSound.play();
						setIsPlaying(true);
						setSeconds(0);
						setCurrTime({ min: 0, sec: 0 });
						setPlayingSong(currentSong);
					},
				});
				setSound(newSound);
				soundRef.current = newSound;
			} else {
				setIsPlaying(false);
			}
		}
	};

	const prevSong = () => {
		setCurrTime({ min: 0, sec: 0 });
		setCurrentSong((prevSong) => (prevSong - 1 + songs.length) % songs.length);
		setPlayingSong(null); // Clear playingSong when changing songs

		if (soundRef.current) {
			soundRef.current.stop();
			if (isPlaying) {
				const newSound = Howl({
					src: [songs[(currentSong - 1 + songs.length) % songs.length].src],
					onend: () => {
						setIsPlaying(false);
						setCurrTime({ min: 0, sec: 0 });
						setSeconds(0);
					},
					onload: () => {
						if (soundRef.current) {
							soundRef.current.stop();
						}
						newSound.play();
						setIsPlaying(true);
						setSeconds(0);
						setCurrTime({ min: 0, sec: 0 });
						setPlayingSong(currentSong);
					},
				});
				setSound(newSound);
				soundRef.current = newSound;
			} else {
				setIsPlaying(false);
			}
		}
	};

	console.log('isPlaying', isPlaying);
	console.log('currentSong', currentSong);
	console.log('sound', sound);
	console.log('soundRef', soundRef);
	console.log('playingSong', playingSong);

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
				<button className={styles.controlButton} onClick={playingButton}>
					<i
						className={`fas ${
							isPlaying ? 'fa-pause-circle' : 'fa-play-circle'
						}`}
					></i>
				</button>
				<button className={styles.controlButton} onClick={nextSong}>
					<i className='fas fa-step-forward'></i>
				</button>
			</div>
			<div className={styles.time}>
				<p>
					{currTime.min}:{currTime.sec < 10 ? '0' + currTime.sec : currTime.sec}
				</p>
				{sound && seconds !== null && (
					<p>
						{Math.floor((sound.duration() - seconds) / 60)}:
						{(Math.floor(sound.duration() - seconds) % 60)
							.toString()
							.padStart(2, '0')}
					</p>
				)}
			</div>
			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={sound?.duration() || 0}
					value={seconds || 0}
					onChange={(e) => {
						if (sound) {
							const newTime = Number(e.target.value);
							sound.seek(newTime);
							setSeconds(newTime);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
