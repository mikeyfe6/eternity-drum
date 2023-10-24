import React, { useRef } from 'react';

// import Swiper core and required modules
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Parallax,
	Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import '../styles/swiper.scss';


// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/parallax';
import 'swiper/scss/autoplay';

import beats from '../images/hero/beats.jpg';
import mandhood from '../images/hero/manhood-ac.jpg';
import umuntu from '../images/hero/umuntu.jpg';
import youngep from '../images/hero/young-ep.jpg';

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
		<section className='swiper-container'>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Autoplay]}
				spaceBetween={0}
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
			>
				<SwiperSlide>
					<img src={beats} alt='' />
				</SwiperSlide>
				<SwiperSlide>
					<img src={mandhood} alt='' />
				</SwiperSlide>
				<SwiperSlide>
					<img src={umuntu} alt='' />
				</SwiperSlide>
				<SwiperSlide>
					<img src={youngep} alt='' />
				</SwiperSlide>

				<div className='autoplay-progress' slot='container-end'>
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
