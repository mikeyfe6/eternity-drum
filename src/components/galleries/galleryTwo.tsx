import React, { useState, useEffect } from "react";

import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { Navigation, Pagination, Scrollbar, Thumbs } from "swiper/modules";

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

const GalleryTwo: React.FC = () => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [imageCount, setImageCount] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState<ThumbsSwiperType | null>(
        null
    );

    const [lightboxImage, setLightboxImage] = useState<any>(null);

    const data = useStaticQuery(graphql`
        query {
            allS3ImageFile(
                filter: { folderName: { regex: "/swazoomlive-031222/" } }
            ) {
                edges {
                    node {
                        id
                        title
                        file {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
        }
    `);

    useEffect(() => {
        if (data?.allS3ImageFile?.edges) {
            const fetchedImages = data.allS3ImageFile.edges.map(
                (edge: any) => ({
                    title: edge.node.title || "",
                    imageData: getImage(edge.node.file.childImageSharp),
                })
            );
            setImages(fetchedImages);
            setImageCount(fetchedImages.length);
        } else {
            console.error("No images found or query failed.");
        }
    }, [data]);

    const openLightbox = (imageData: any) => {
        setLightboxImage(imageData);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.key === "Enter") {
                closeLightbox();
            }
        };

        if (lightboxImage) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxImage]);

    const shouldLoop = imageCount > 2;

    return (
        <div className={styles.swiperContainer} data-main-gallery>
            <h3>
                Swazoom Live <span>3 December 2022</span>
            </h3>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Thumbs]}
                spaceBetween={5}
                slidesPerView={1}
                loop={shouldLoop}
                thumbs={{ swiper: thumbsSwiper as any }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 7,
                }}
                scrollbar={{ draggable: true }}
                className={styles.swiperWrapper}
                navigation={true}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlideTop}>
                        <div onClick={() => openLightbox(image.imageData)}>
                            <GatsbyImage
                                image={image.imageData}
                                alt={image.title}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={(swiper: ThumbsSwiperType) => {
                    if (swiper) {
                        setThumbsSwiper(swiper);
                    }
                }}
                loop={shouldLoop}
                spaceBetween={10}
                slidesPerView={3}
                breakpoints={{
                    640: { slidesPerView: 4 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 6 },
                }}
                modules={[Thumbs]}
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className={styles.swiperSlideBottom}
                    >
                        <GatsbyImage
                            image={image.imageData}
                            alt={image.title}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {lightboxImage && (
                <div className={`${styles.lightboxContainer} lightbox-modal`}>
                    <div className={styles.lightboxContent}>
                        <GatsbyImage
                            image={lightboxImage}
                            alt="Swazoom Live - 3 December 2022"
                            className={styles.lightboxImage}
                        />
                    </div>
                    <button
                        className={styles.lightboxClose}
                        onClick={closeLightbox}
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default GalleryTwo;
