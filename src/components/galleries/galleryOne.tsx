import * as React from 'react';
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

const GalleryOne: React.FC = () => {
	const [thumbsSwiper, setThumbsSwiper] =
		React.useState<ThumbsSwiperType | null>(null);

	const progressCircle = React.useRef<SVGSVGElement | null>(null);
	const progressContent = React.useRef<HTMLSpanElement | null>(null);

	const data = useStaticQuery(graphql`
		query AllGalleryOneImages {
			allS3Object(
				filter: { Key: { regex: "/^photos/swazoomlive-080723/[^/]+$/" } }
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

	return (
		<section className={styles.swiperContainer}>
			<h3>Swazoom Live - 8 Juli 2023</h3>
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
				spaceBetween={10}
				slidesPerView={1}
				centeredSlides={true}
				loop={true}
				parallax={true}
				navigation
				thumbs={{ swiper: thumbsSwiper as any }}
				pagination={{
					clickable: true,
				}}
				scrollbar={{
					draggable: true,
				}}
				autoplay={{
					delay: 6000,
					disableOnInteraction: false,
				}}
				onAutoplayTimeLeft={onAutoplayTimeLeft}
				className={styles.swiperWrapper}
			>
				{images.map((image: ImageType, index: number) => (
					<SwiperSlide key={index} className={styles.swiperSlideTop}>
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
		</section>
	);
};

export default GalleryOne;
