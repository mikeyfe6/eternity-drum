import React, { useState, useRef } from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

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

import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import * as styles from '../../styles/modules/gallery.module.scss';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/parallax';
import 'swiper/scss/autoplay';

type ImageType = {
	Key: string;
	localFile: {
		name: string;
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData | undefined;
		};
	};
};

type ThumbsSwiperType = {
	params: SwiperOptions;
	originalParams: SwiperOptions;
	el: HTMLElement | null;
	wrapperEl: HTMLElement | null;
};

const GallerySeven: React.FC = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState<ThumbsSwiperType | null>(
		null
	);
	const [lightboxImage, setLightboxImage] = useState<IGatsbyImageData | null>(
		null
	);

	const progressCircle = useRef<SVGSVGElement | null>(null);
	const progressContent = useRef<HTMLSpanElement | null>(null);

	const data = useStaticQuery(graphql`
		query AllGallerySevenImages {
			allS3Object(
				filter: { Key: { regex: "/^photos/pulseandbeat-01/[^/]+$/" } }
			) {
				nodes {
					Key
					localFile {
						name
						childImageSharp {
							gatsbyImageData(
								layout: FULL_WIDTH
								placeholder: BLURRED
								aspectRatio: 1.5
							)
						}
					}
				}
			}
		}
	`);

	const images = data.allS3Object.nodes;

	if (images.length === 0) {
		return <div>No images found in the specified directory.</div>;
	}

	const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
		progressCircle.current?.style.setProperty(
			'--progress',
			String(1 - progress)
		);
		if (progressContent.current) {
			progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
		}
	};

	const openLightbox = (image: IGatsbyImageData) => {
		setLightboxImage(image);
		document.body.style.overflow = 'hidden';
	};

	const closeLightbox = () => {
		setLightboxImage(null);
		document.body.style.overflow = 'visible';
	};

	return (
		<section className={styles.swiperContainer} data-main-gallery>
			<h3>
				Pulse and Beat <span>(collab. w/ ACE Dance & Music)</span>
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
				// autoplay={{
				// 	delay: 6000,
				// 	disableOnInteraction: false,
				// }}
				onAutoplayTimeLeft={onAutoplayTimeLeft}
				className={styles.swiperWrapper}
			>
				{images.map((image: ImageType, index: number) => (
					<SwiperSlide key={index} className={styles.swiperSlideTop}>
						{image.localFile?.childImageSharp?.gatsbyImageData && (
							<div
								onClick={() =>
									image.localFile?.childImageSharp?.gatsbyImageData &&
									openLightbox(image.localFile.childImageSharp.gatsbyImageData)
								}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										image.localFile?.childImageSharp?.gatsbyImageData &&
											openLightbox(
												image.localFile.childImageSharp.gatsbyImageData
											);
									}
								}}
								style={{ cursor: 'pointer' }}
							>
								<GatsbyImage
									image={
										getImage(
											image.localFile.childImageSharp.gatsbyImageData
										) as IGatsbyImageData
									}
									alt={image.localFile.name}
								/>
							</div>
						)}
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
					640: {
						slidesPerView: 4,
					},
					768: {
						slidesPerView: 5,
					},
					1024: {
						slidesPerView: 6,
					},
				}}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
			>
				{images.map((image: ImageType, index: number) => (
					<SwiperSlide key={index} className={styles.swiperSlideBottom}>
						{image.localFile?.childImageSharp?.gatsbyImageData && (
							<GatsbyImage
								image={
									getImage(
										image.localFile.childImageSharp.gatsbyImageData
									) as IGatsbyImageData
								}
								alt={image.localFile.name}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>

			{lightboxImage && (
				<div className={styles.lightboxContainer}>
					<div className={styles.lightboxContent}>
						<GatsbyImage
							image={lightboxImage}
							alt='Pulse and Beat (collab. w/ ACE Dance & Music)'
							className={styles.lightboxImage}
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

export default GallerySeven;
