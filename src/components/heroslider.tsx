import React, { useRef } from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Parallax,
	Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/parallax';
import 'swiper/css/autoplay';

import * as styles from '../styles/modules/heroslider.module.scss';

const Hero: React.FC = () => {
	const progressCircle = useRef<SVGSVGElement | null>(null);
	const progressContent = useRef<HTMLSpanElement | null>(null);

	const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
		progressCircle.current?.style.setProperty(
			'--progress',
			String(1 - progress)
		);

		if (progressContent.current) {
			progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
		}
	};

	return (
		<section className={styles.swiperContainer} data-main-hero>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Autoplay]}
				spaceBetween={10}
				slidesPerView={1}
				centeredSlides={true}
				loop={true}
				parallax={true}
				navigation
				pagination={{
					clickable: true,
				}}
				scrollbar={{
					draggable: true,
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				onAutoplayTimeLeft={onAutoplayTimeLeft}
				className={styles.swiperWrapper}>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/thecrew.jpg'
							alt={`The Crew`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/young-ep.jpg'
							alt={`The Crew`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/beats.jpg'
							alt={`Beats`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/manhood-ac.jpg'
							alt={`Manhood`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/umuntu.jpg'
							alt={`Umuntu`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/ep-botd.jpg'
							alt={`Young Eternity`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/ep-ogs.jpg'
							alt={`Young Eternity`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/ep-kids-linedup.jpg'
							alt={`Young Eternity`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/ep-future.jpg'
							alt={`Young Eternity`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/nottinghill.jpg'
							alt={`Young Eternity`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSlide}>
					<div className={styles.swiperImage}>
						<StaticImage
							src='../images/hero/kids-performing.jpg'
							alt={`Young Eternity`}
							placeholder='blurred'
							style={{ width: '100%' }}
						/>
					</div>
				</SwiperSlide>

				<div className={styles.autoplayProgress} slot='container-end'>
					<svg viewBox='0 0 48 48' ref={progressCircle}>
						<circle cx='24' cy='24' r='20'></circle>
					</svg>
					<span ref={progressContent} hidden></span>
				</div>
			</Swiper>
		</section>
	);
};

export default Hero;
