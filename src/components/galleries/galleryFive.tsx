import React, { useState, useEffect, useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Parallax,
	Autoplay,
	FreeMode,
	Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/parallax";
import "swiper/css/autoplay";

import * as styles from "../../styles/modules/components/gallery.module.scss";

type ImageType = {
	title: string;
	imageData: any;
};

type ThumbsSwiperType = {
	params: SwiperOptions;
	originalParams: SwiperOptions;
	el: HTMLElement | null;
	wrapperEl: HTMLElement | null;
};

const GalleryFive: React.FC = () => {
	const [images, setImages] = useState<ImageType[]>([]);
	const [thumbsSwiper, setThumbsSwiper] = useState<ThumbsSwiperType | null>(
		null
	);

	const [lightboxImage, setLightboxImage] = useState<any>(null);

	const progressCircle = useRef<SVGSVGElement | null>(null);
	const progressContent = useRef<HTMLSpanElement | null>(null);

	const data = useStaticQuery(graphql`
		query {
			allS3ImageFile(filter: { folderName: { regex: "/adpaf-101119/" } }) {
				edges {
					node {
						id
						title
						file {
							childImageSharp {
								gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
							}
						}
					}
				}
			}
		}
	`);

	useEffect(() => {
		if (data?.allS3ImageFile) {
			const fetchedImages = data.allS3ImageFile.edges.map((edge: any) => ({
				title: edge.node.title || "",
				imageData: getImage(edge.node.file.childImageSharp),
			}));
			setImages(fetchedImages);
		}
	}, [data]);

	const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
		progressCircle.current?.style.setProperty(
			"--progress",
			String(1 - progress)
		);
		if (progressContent.current) {
			progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
		}
	};

	const openLightbox = (imageData: any) => {
		setLightboxImage(imageData);
		document.body.style.overflow = "hidden";
	};

	const closeLightbox = () => {
		setLightboxImage(null);
		document.body.style.overflow = "visible";
	};

	return (
		<div className={styles.swiperContainer} data-main-gallery>
			<h3>
				African Diaspora Performing Arts Festival <span>10 November 2019</span>
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
				className={styles.swiperWrapper}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={styles.swiperSlideTop}>
						<div
							onClick={() => openLightbox(image.imageData)}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									openLightbox(image.imageData);
								}
							}}
						>
							<GatsbyImage image={image.imageData} alt={image.title} />
						</div>
					</SwiperSlide>
				))}

				<div className={styles.autoplayProgress} slot="container-end">
					<svg viewBox="0 0 48 48" ref={progressCircle}>
						<circle cx="24" cy="24" r="20"></circle>
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
				modules={[FreeMode, Navigation, Thumbs]}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={styles.swiperSlideBottom}>
						<GatsbyImage image={image.imageData} alt={image.title} />
					</SwiperSlide>
				))}
			</Swiper>

			{lightboxImage && (
				<div className={styles.lightboxContainer} onClick={closeLightbox}>
					<div className={styles.lightboxContent}>
						<GatsbyImage
							image={lightboxImage}
							alt="African Diaspora Performing Arts Festival - 10 November 2019"
							className={styles.lightboxImage}
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
					<button className={styles.lightboxClose} onClick={closeLightbox}>
						&times;
					</button>
				</div>
			)}
		</div>
	);
};

export default GalleryFive;
