import React, { ReactNode, useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faHouseChimney,
	faCaretRight,
	faCircleExclamation,
	faUpRightFromSquare,
	faEnvelope,
	faDrum,
	faPhone,
	faMobile,
	faPowerOff,
	faStepBackward,
	faPauseCircle,
	faPlayCircle,
	faStepForward,
	faVolumeMute,
	faVolumeLow,
	faVolumeHigh,
	faCaretUp,
	faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import {
	faFacebook,
	faInstagram,
	faYoutube,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

library.add(
	faHouseChimney,
	faCaretRight,
	faCircleExclamation,
	faUpRightFromSquare,
	faEnvelope,
	faDrum,
	faPhone,
	faMobile,
	faFacebook,
	faInstagram,
	faYoutube,
	faWhatsapp,
	faPowerOff,
	faStepBackward,
	faPauseCircle,
	faPlayCircle,
	faStepForward,
	faVolumeMute,
	faVolumeLow,
	faVolumeHigh,
	faCaretUp,
	faCaretDown
);

import Header from "../components/header";
import Footer from "../components/footer";

import MobileMenu from "./mobileMenu";

import "../styles/layout.scss";

const duration = 0.1;

const variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration } },
	exit: { opacity: 0, transition: { duration } },
};

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const openMobileMenu = () => {
		setIsMobileMenuOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		document.body.style.overflow = "visible";
	};

	const handleOverlayClick = () => {
		if (isMobileMenuOpen) {
			closeMobileMenu();
		}
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1600 && isMobileMenuOpen) {
				closeMobileMenu();
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isMobileMenuOpen]);

	const pathname =
		typeof window !== "undefined" ? window.location.pathname : "";

	return (
		<div className="eternity-container">
			<Header openMobileMenu={openMobileMenu} />
			<div className="eternity-wrapper">
				<AnimatePresence mode="wait">
					<motion.main
						key={pathname}
						variants={variants}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<main>{children}</main>
					</motion.main>
				</AnimatePresence>
			</div>
			<Footer />

			{isMobileMenuOpen && (
				<div className="overlay" onClick={handleOverlayClick} />
			)}

			<MobileMenu isOpen={isMobileMenuOpen} closeMenu={closeMobileMenu} />
		</div>
	);
};

export default Layout;
