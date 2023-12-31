import React, { ReactNode, useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Header from '../components/header';
import Footer from '../components/footer';

import MobileMenu from './mobileMenu';

import '../styles/layout.scss';
import '../styles/forms.scss';
import '../styles/content.scss';
import '../styles/audio.scss';
import '../styles/swiper.scss';

const duration = 0.25;

const variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: duration } },
	exit: { opacity: 0, transition: { duration: duration } },
};

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const openMobileMenu = () => {
		setIsMobileMenuOpen(true);
		document.body.style.overflow = 'hidden';
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		document.body.style.overflow = 'visible';
	};

	const handleOverlayClick = () => {
		if (isMobileMenuOpen) {
			closeMobileMenu();
		}
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1400 && isMobileMenuOpen) {
				closeMobileMenu();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobileMenuOpen]);

	return (
		<div className='eternity-container'>
			<Header openMobileMenu={openMobileMenu} />
			<div className='eternity-wrapper'>
				<AnimatePresence mode='wait'>
					<motion.main
						key={typeof window !== 'undefined' ? window.location.pathname : ''}
						variants={variants}
						initial='initial'
						animate='animate'
						exit='exit'
						className='main-content' // Add your own class here if needed
					>
						<main>{children}</main>
					</motion.main>
				</AnimatePresence>
			</div>
			<Footer />

			{isMobileMenuOpen && (
				<div className='overlay' onClick={handleOverlayClick} />
			)}

			<MobileMenu isOpen={isMobileMenuOpen} closeMenu={closeMobileMenu} />
		</div>
	);
};

export default Layout;
