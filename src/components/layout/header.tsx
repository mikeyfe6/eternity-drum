import React, { useState, useEffect } from "react";

import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import * as styles from "../../styles/modules/layout/header.module.scss";

interface HeaderProps {
	openMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ openMobileMenu }) => {
	const [isHeaderFixed, setIsHeaderFixed] = useState(false);
	const [, setScrollY] = useState(0);

	const {
		title,
		facebookUrl,
		instagramUrl,
		// linkedinUrl,
		youtubeUrl,
		mobileRaw,
		slogan,
	} = useSiteMetadata();

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const headerBanner = document.querySelector(`.${styles.headerBanner}`);
			const headerMenu = document.querySelector(
				`.${styles.headerMenu}`
			) as HTMLElement;
			const mainContent = document.querySelector(
				".eternity-wrapper"
			) as HTMLElement;

			setScrollY(currentScrollY);

			if (headerBanner) {
				const headerBannerHeight = (headerBanner as HTMLElement).offsetHeight;

				if (currentScrollY > headerBannerHeight) {
					if (mainContent) {
						mainContent.style.marginTop =
							window.innerWidth > 640 ? "125px" : "90px";
					}

					setIsHeaderFixed(true);
				} else {
					if (mainContent) {
						mainContent.style.marginTop = "0";
					}
					setIsHeaderFixed(false);
				}

				if (headerMenu) {
					if (currentScrollY > headerBannerHeight + 125) {
						headerMenu.classList.add(styles.shrinked);
					} else {
						headerMenu.classList.remove(styles.shrinked);
					}
				}
			}
		};

		const debouncedHandleScroll = debounce(handleScroll, 10);

		window.addEventListener("scroll", debouncedHandleScroll);

		return () => {
			window.removeEventListener("scroll", debouncedHandleScroll);
		};
	}, []);

	const menuSwitchClass = isHeaderFixed
		? `${styles.headerMenu} ${styles.fixedMenu}`
		: styles.headerMenu;

	return (
		<header className={styles.header}>
			<div className={styles.headerBanner}>
				<div className={styles.headerBannerWrapper}>
					<p>{slogan}</p>
					<ul>
						<li>
							<a
								href={facebookUrl}
								rel="noopener noreferrer"
								target="_blank"
								aria-label="Facebook"
							>
								<FontAwesomeIcon icon={["fab", "facebook"]} />
							</a>
						</li>
						<li>
							<a
								href={instagramUrl}
								rel="noopener noreferrer"
								target="_blank"
								aria-label="Instagram"
							>
								<FontAwesomeIcon icon={["fab", "instagram"]} />
							</a>
						</li>
						{/* <li>
							<a href={linkedinUrl} rel="noopener noreferrer" target="_blank">
								<FontAwesomeIcon icon={["fab", "linkedin"]} />
							</a>
						</li> */}
						<li>
							<a
								href={youtubeUrl}
								rel="noopener noreferrer"
								target="_blank"
								aria-label="Youtube"
							>
								<FontAwesomeIcon icon={["fab", "youtube"]} />
							</a>
						</li>
						<li>
							<a
								href={`https://wa.me/${mobileRaw}`}
								rel="noopener noreferrer"
								target="_blank"
								aria-label="WhatsApp"
							>
								<FontAwesomeIcon icon={["fab", "whatsapp"]} />
							</a>
						</li>
					</ul>
				</div>
			</div>

			<nav className={menuSwitchClass}>
				<div className={styles.mobileMenu}>
					<div className={styles.mobileLogo}>
						<Link to="/">
							<StaticImage
								src="../../images/logo/ep-logo.png"
								alt={`${title} Logo`}
								placeholder="blurred"
							/>
						</Link>
					</div>

					<button
						type="button"
						name="menu"
						onClick={openMobileMenu}
						className={styles.hamburgerButton}
						aria-label="Menu"
					>
						<div className={styles.hamburgerIcon}>
							<div className={styles.hamburgerIconBar} />
							<div className={styles.hamburgerIconBar} />
							<div className={styles.hamburgerIconBar} />
						</div>
					</button>
				</div>

				<ul className={styles.desktopMenu}>
					<li>
						<Link to="/" activeClassName={styles.activeMenuItem}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/boeken/" activeClassName={styles.activeMenuItem}>
							Boeken
						</Link>
					</li>
					<li>
						<Link
							to="/drumworkshops/"
							className={styles.parent}
							activeClassName={styles.activeMenuItem}
							partiallyActive={true}
						>
							Drumworkshops
						</Link>
						<ul className={styles.children}>
							<li>
								<Link
									to="/drumworkshops/summerschool-2020/"
									activeClassName={styles.activeMenuItem}
								>
									Eternity Summerschool 2020
								</Link>
							</li>
							<li>
								<Link
									to="/drumworkshops/summerschool-2021/"
									activeClassName={styles.activeMenuItem}
								>
									Eternity Summerschool 2021
								</Link>
							</li>
						</ul>
					</li>
					<li>
						<Link
							to="/cultuureducatie/"
							activeClassName={styles.activeMenuItem}
						>
							Cultuureducatie
						</Link>
					</li>
					<li>
						<Link
							to="/theater/"
							className={styles.parent}
							activeClassName={styles.activeMenuItem}
							partiallyActive={true}
						>
							Theater
						</Link>
						<ul className={styles.children}>
							<li>
								<Link
									to="/theater/kwasi-en-yaw/"
									activeClassName={styles.activeMenuItem}
								>
									Kwasi & Yaw
								</Link>
							</li>
							<li>
								<Link
									to="/theater/muziki/"
									activeClassName={styles.activeMenuItem}
								>
									Muziki
								</Link>
							</li>
							<li>
								<Link
									to="/theater/umuntu/"
									activeClassName={styles.activeMenuItem}
								>
									Umuntu
								</Link>
							</li>
						</ul>
					</li>
					<li className={styles.logo}>
						<Link to="/" className={styles.logoWrapper}>
							<StaticImage
								src="../../images/logo/ep-logo.png"
								alt={`${title} Logo`}
								placeholder="blurred"
							/>
						</Link>
					</li>
					<li>
						<Link to="/uitwisselingen/" activeClassName={styles.activeMenuItem}>
							Uitwisselingen
						</Link>
					</li>
					<li>
						<Link
							to="/projecten/"
							className={styles.parent}
							activeClassName={styles.activeMenuItem}
							partiallyActive={true}
						>
							Projecten
						</Link>
						<ul className={styles.children}>
							<li>
								<Link
									to="/projecten/sankofa-academy/"
									activeClassName={styles.activeMenuItem}
								>
									Sankofa Academy
								</Link>
							</li>
							<li>
								<Link
									to="/projecten/bijlmer-drum-festival/"
									activeClassName={styles.activeMenuItem}
								>
									Bijlmer Drum Festival
								</Link>
							</li>
							<li>
								<Link
									to="/projecten/van-hobby-naar-succes/"
									activeClassName={styles.activeMenuItem}
								>
									Van Hobby Naar Succes
								</Link>
							</li>
						</ul>
					</li>
					<li>
						<Link to="/media/" activeClassName={styles.activeMenuItem}>
							Media
						</Link>
					</li>
					<li>
						<Link
							to="/seda/"
							className={styles.special}
							activeClassName={styles.activeMenuItem}
						>
							Seda
						</Link>
					</li>
					<li>
						<Link
							to="/over-ons/"
							className={styles.parent}
							activeClassName={styles.activeMenuItem}
							partiallyActive={true}
						>
							Over ons
						</Link>
						<ul className={styles.children}>
							<li>
								<Link
									to="/over-ons/contact/"
									activeClassName={styles.activeMenuItem}
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									to="/over-ons/vacatures/"
									activeClassName={styles.activeMenuItem}
									partiallyActive={true}
								>
									Vacatures
								</Link>
							</li>
							<li>
								<Link
									to="/over-ons/anbi/"
									activeClassName={styles.activeMenuItem}
								>
									ANBI
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;

const debounce = (func: Function, wait: number) => {
	let timeout: number;
	return function (...args: any[]) {
		clearTimeout(timeout);
		timeout = window.setTimeout(() => func(...args), wait);
	};
};
