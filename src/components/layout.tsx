import React, { ReactNode, useState, useEffect } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import MobileMenu from '../components/mobilemenu';

import '../styles/layout.scss';
import '../styles/forms.scss';
import '../styles/content.scss';
import '../styles/audio.scss';
import '../styles/swiper.scss';

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
				<main>{children}</main>
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
