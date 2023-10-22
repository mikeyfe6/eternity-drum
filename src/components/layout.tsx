import React, { ReactNode, useState } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import MobileMenu from '../components/mobilemenu';

import '../styles/layout.scss';

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
