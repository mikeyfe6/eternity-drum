import React, { useRef } from "react";

import { StaticImage } from "gatsby-plugin-image";

import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import * as styles from "../../styles/modules/layout/heroslider.module.scss";

const Hero: React.FC = () => {
    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLSpanElement | null>(null);

    const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
        progressCircle.current?.style.setProperty(
            "--progress",
            String(1 - progress)
        );

        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
        }
    };

    return (
        <section className={styles.swiperContainer} id="hero">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className={styles.swiperWrapper}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    <div className={styles.swiperImage}>
                        <StaticImage
                            src="../../images/hero/ep-210924-1.jpg"
                            alt={`The Leaders of Tomorrow`}
                            objectPosition="50% 10%"
                            loading="eager"
                            width={1750}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <div className={styles.swiperImage}>
                        <StaticImage
                            src="../../images/hero/adpaf-161124-1.jpg"
                            alt={`ADPAF 2024`}
                            objectPosition="50% 15%"
                            loading="eager"
                            width={1750}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <div className={styles.swiperImage}>
                        <StaticImage
                            src="../../images/hero/adpaf-161124-2.jpg"
                            alt={`ADPAF 2024`}
                            objectPosition="50% 20%"
                            loading="eager"
                            width={1750}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <div className={styles.swiperImage}>
                        <StaticImage
                            src="../../images/hero/ep-210924-2.jpg"
                            alt={`The Leaders of Tomorrow`}
                            objectPosition="50% 10%"
                            loading="eager"
                            width={1750}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <div className={styles.swiperImage}>
                        <StaticImage
                            src="../../images/hero/next-on-stage-131224.jpg"
                            alt={`Next on Stage 2024`}
                            objectPosition="50% 15%"
                            loading="eager"
                            width={1750}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <div className={styles.swiperImage}>
                        <StaticImage
                            src="../../images/hero/ep-210924-3.jpg"
                            alt={`The Leaders of Tomorrow`}
                            objectPosition="50% 15%"
                            loading="eager"
                            width={1750}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <div className={styles.swiperImage}>
                        <StaticImage
                            src="../../images/hero/untold-drumfestival-011224.jpg"
                            alt={`Untold Drumfestival`}
                            loading="eager"
                            width={1750}
                        />
                    </div>
                </SwiperSlide>
                <div className={styles.autoplayProgress} slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent} hidden></span>
                </div>
            </Swiper>
        </section>
    );
};

export default Hero;
