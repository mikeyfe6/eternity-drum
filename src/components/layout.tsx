import React, { ReactNode } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import Sidebar from '../components/sidebar';

import '../styles/layout.scss';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='eternity-container'>
			<Header />
			<div className='eternity-wrapper'>
				<main>{children}</main>
				<Sidebar />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
