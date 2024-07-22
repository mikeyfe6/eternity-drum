import React, { useState, useEffect, useRef } from 'react';

import { graphql, useStaticQuery } from 'gatsby';

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
import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/parallax';
import 'swiper/scss/autoplay';

import * as styles from '../../styles/modules/gallery.module.scss';

type ImageType = {
	title: string;
	src: string;
};

type ThumbsSwiperType = {
	params: SwiperOptions;
	originalParams: SwiperOptions;
	el: HTMLElement | null;
	wrapperEl: HTMLElement | null;
};

const GalleryFour: React.FC = () => {
	const [images, setImages] = useState<ImageType[]>([]);
	const [thumbsSwiper, setThumbsSwiper] = useState<ThumbsSwiperType | null>(
		null
	);

	const [lightboxImage, setLightboxImage] = useState<string | null>(null);

	const progressCircle = useRef<SVGSVGElement | null>(null);
	const progressContent = useRef<HTMLSpanElement | null>(null);

	const data = useStaticQuery(graphql`
		query {
			allS3ImageFile(filter: { folderName: { regex: "/epinuk-01/" } }) {
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

	useEffect(() => {
		if (data?.allS3ImageFile) {
			const fetchedImages = data.allS3ImageFile.edges.map((edge: any) => ({
				title: edge.node.title || '',
				src: edge.node.src,
			}));
			setImages(fetchedImages);
		}
	}, [data]);

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
				Eternity in UK 2023 <span>(collab. w/ ACE Dance & Music)</span>
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
						<img src={image.src} alt={image.title} />
					</SwiperSlide>
				))}
			</Swiper>

			{lightboxImage && (
				<div className={styles.lightboxContainer} onClick={closeLightbox}>
					<div className={styles.lightboxContent}>
						<img
							src={lightboxImage}
							alt='Eternity in UK 2023 (collab. w/ ACE Dance & Music)'
							className={styles.lightboxImage}
							onClick={(e) => e.stopPropagation()}
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

export default GalleryFour;
