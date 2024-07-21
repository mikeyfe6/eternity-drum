import React, { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Parallax,
	Autoplay,
	FreeMode,
	Thumbs,
} from 'swiper/modules';

import * as styles from '../../styles/modules/gallery.module.scss';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/parallax';
import 'swiper/scss/autoplay';

import { fetchS3Files } from '../../utils/aws-init';

type ImageType = {
	title: string;
	artist: string;
	src: string;
};

type ThumbsSwiperType = {
	params: SwiperOptions;
	originalParams: SwiperOptions;
	el: HTMLElement | null;
	wrapperEl: HTMLElement | null;
};

const GalleryOne: React.FC = () => {
	const [images, setImages] = useState<ImageType[]>([]);
	const [thumbsSwiper, setThumbsSwiper] = useState<ThumbsSwiperType | null>(
		null
	);

	const [lightboxImage, setLightboxImage] = useState<string | null>(null);

	const progressCircle = useRef<SVGSVGElement | null>(null);
	const progressContent = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		const loadImages = async () => {
			const bucketName = process.env.GATSBY_AWS_EP_BUCKET_NAME || '';
			const prefix = 'photos/swazoomlive-080723/';

			const fetchedImages = await fetchS3Files(bucketName, prefix);
			const formattedImages = fetchedImages.map((image) => ({
				title: image.title || '',
				artist: image.artist,
				src: image.src,
			}));
			setImages(formattedImages);
		};

		loadImages();
	}, []);

	const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
		progressCircle.current?.style.setProperty(
			'--progress',
			String(1 - progress)
		);
		if (progressContent.current) {
			progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
		}
	};

	const openLightbox = (imageSrc: string) => {
		setLightboxImage(imageSrc);
		document.body.style.overflow = 'hidden';
	};

	const closeLightbox = () => {
		setLightboxImage(null);
		document.body.style.overflow = 'visible';
	};

	return (
		<section className={styles.swiperContainer} data-main-gallery>
			<h3>
				Swazoom Live <span>8 Juli 2023</span>
			</h3>
			<Swiper
				modules={[
					Navigation,
					Pagination,
					Scrollbar,
					A11y,
					Parallax,
					Autoplay,
					FreeMode,
					Thumbs,
				]}
				spaceBetween={5}
				slidesPerView={1}
				centeredSlides={true}
				loop={true}
				parallax={true}
				navigation
				thumbs={{ swiper: thumbsSwiper as any }}
				pagination={{
					clickable: true,
					dynamicBullets: true,
					dynamicMainBullets: 7,
				}}
				scrollbar={{
					draggable: true,
				}}
				onAutoplayTimeLeft={onAutoplayTimeLeft}
				className={styles.swiperWrapper}>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={styles.swiperSlideTop}>
						<div
							onClick={() => openLightbox(image.src)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									openLightbox(image.src);
								}
							}}>
							<img src={image.src} alt={image.title} />
						</div>
					</SwiperSlide>
				))}

				<div className={styles.autoplayProgress} slot='container-end'>
					<svg viewBox='0 0 48 48' ref={progressCircle}>
						<circle cx='24' cy='24' r='20'></circle>
					</svg>
					<span ref={progressContent} hidden></span>
				</div>
			</Swiper>
			<Swiper
				onSwiper={(swiper) => {
					if (swiper) {
						setThumbsSwiper(swiper as any);
					}
				}}
				loop
				spaceBetween={10}
				slidesPerView={3}
				breakpoints={{
					640: { slidesPerView: 4 },
					768: { slidesPerView: 5 },
					1024: { slidesPerView: 6 },
				}}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={styles.swiperSlideBottom}>
						<img src={image.src} alt={image.title} loading='lazy' />
					</SwiperSlide>
				))}
			</Swiper>

			{lightboxImage && (
				<div className={styles.lightboxContainer} onClick={closeLightbox}>
					<div className={styles.lightboxContent}>
						<img
							src={lightboxImage}
							alt='Swazoom Live - 8 Juli 2023'
							className={styles.lightboxImage}
							onClick={(e) => e.stopPropagation()}
							loading='lazy'
						/>
					</div>
					<button className={styles.lightboxClose} onClick={closeLightbox}>
						&times;
					</button>
				</div>
			)}
		</section>
	);
};

export default GalleryOne;
