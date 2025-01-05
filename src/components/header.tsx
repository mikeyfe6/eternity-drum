import React, { useState, useEffect } from 'react';

import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { useSiteMetadata } from '../hooks/use-site-metadata';

import * as styles from '../styles/modules/header.module.scss';

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
			const headerTopBannerWrapper = document.querySelector(
				`.${styles.headerTopBannerWrapper}`
			);
			const headerMenuWrapper = document.querySelector(
				`.${styles.headerMenu}`
			) as HTMLElement;
			const mainContent = document.querySelector(
				`.eternity-wrapper`
			) as HTMLElement;

			setScrollY(currentScrollY);

			if (headerTopBannerWrapper) {
				const headerTopBannerHeight = (headerTopBannerWrapper as HTMLElement)
					.offsetHeight;

				if (currentScrollY > headerTopBannerHeight) {
					if (mainContent) {
						mainContent.style.marginTop =
							window.innerWidth > 576 ? '125px' : '90px';
					}
					setIsHeaderFixed(true);
				} else {
					if (mainContent) {
						mainContent.style.marginTop = '0';
					}
					setIsHeaderFixed(false);
				}

				if (currentScrollY > headerTopBannerHeight + 25) {
					if (headerMenuWrapper) {
						headerMenuWrapper.style.height = '90px';
					}
				} else {
					if (headerMenuWrapper && window.innerWidth > 576) {
						headerMenuWrapper.style.height = '125px';
					}
				}
			}
		};

		const debouncedHandleScroll = debounce(handleScroll, 10);

		window.addEventListener('scroll', debouncedHandleScroll);

		return () => {
			window.removeEventListener('scroll', debouncedHandleScroll);
		};
	}, []);

	const menuSwitchClass = isHeaderFixed
		? `${styles.headerMenu} ${styles.fixedMenu}`
		: styles.headerMenu;

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerWrapper}>
				<div className={styles.headerTopBanner}>
					<div className={styles.headerTopBannerWrapper}>
						<p>{slogan}</p>
						<ul>
							<li>
								<a href={facebookUrl} rel='noopener noreferrer' target='_blank'>
									<i className='fab fa-facebook' />
								</a>
							</li>
							<li>
								<a
									href={instagramUrl}
									rel='noopener noreferrer'
									target='_blank'>
									<i className='fab fa-instagram' />
								</a>
							</li>
							{/* <li>
								<a href={linkedinUrl} rel='noopener noreferrer' target='_blank'>
									<i className='fab fa-linkedin' />
								</a>
							</li> */}
							<li>
								<a href={youtubeUrl} rel='noopener noreferrer' target='_blank'>
									<i className='fab fa-youtube' />
								</a>
							</li>
							<li>
								<a
									href={`https://wa.me/${mobileRaw}`}
									rel='noopener noreferrer'
									target='_blank'>
									<i className='fab fa-whatsapp' />
								</a>
							</li>
						</ul>
					</div>
				</div>

				<nav className={menuSwitchClass}>
					<div className={styles.mobileMenuContainer}>
						<div className={styles.mobileLogo}>
							<Link to='/'>
								<StaticImage
									src='../images/logo/ep-logo.png'
									alt={`${title} Logo`}
									placeholder='blurred'
								/>
							</Link>
						</div>

						<button
							type='button'
							name='menu'
							onClick={openMobileMenu}
							className={styles.hamburgerButton}>
							<div className={styles.hamburgerIcon}>
								<div className={styles.bar} />
								<div className={styles.bar} />
								<div className={styles.bar} />
							</div>
						</button>
					</div>

					<ul className={styles.menuItems}>
						<li>
							<Link to='/' activeClassName={styles.activeMenuItem}>
								Home
							</Link>
						</li>
						<li>
							<Link to='/boeken/' activeClassName={styles.activeMenuItem}>
								Boeken
							</Link>
						</li>
						<li>
							<Link
								to='/drumworkshops/'
								activeClassName={styles.activeMenuItem}
								partiallyActive={true}>
								Drumworkshops
							</Link>
							<ul>
								<li>
									<Link
										to='/drumworkshops/summerschool-2020/'
										activeClassName={styles.activeMenuItem}>
										Eternity Summerschool 2020
									</Link>
								</li>
								<li>
									<Link
										to='/drumworkshops/summerschool-2021/'
										activeClassName={styles.activeMenuItem}>
										Eternity Summerschool 2021
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link
								to='/cultuureducatie/'
								activeClassName={styles.activeMenuItem}>
								Cultuureducatie
							</Link>
						</li>
						<li>
							<Link
								to='/theater/'
								activeClassName={styles.activeMenuItem}
								partiallyActive={true}>
								Theater
							</Link>
							<ul>
								<li>
									<Link
										to='/theater/kwasi-en-yaw/'
										activeClassName={styles.activeMenuItem}>
										Kwasi & Yaw
									</Link>
								</li>
							</ul>
						</li>
						<li className={styles.logo}>
							<Link to='/' className={styles.logoWrapper}>
								<StaticImage
									src='../images/logo/ep-logo.png'
									alt={`${title} Logo`}
									placeholder='blurred'
								/>
							</Link>
						</li>
						<li>
							<Link
								to='/uitwisselingen/'
								activeClassName={styles.activeMenuItem}>
								Uitwisselingen
							</Link>
						</li>
						<li>
							<Link
								to='/projecten/'
								activeClassName={styles.activeMenuItem}
								partiallyActive={true}>
								Projecten
							</Link>
							<ul>
								<li>
									<Link
										to='/projecten/sankofa-academy/'
										activeClassName={styles.activeMenuItem}>
										Sankofa Academy
									</Link>
								</li>
								<li>
									<Link
										to='/projecten/bijlmer-drum-festival/'
										activeClassName={styles.activeMenuItem}>
										Bijlmer Drum Festival
									</Link>
								</li>
								<li>
									<Link
										to='/projecten/van-hobby-naar-succes/'
										activeClassName={styles.activeMenuItem}>
										Van Hobby Naar Succes
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/media/' activeClassName={styles.activeMenuItem}>
								Media
							</Link>
						</li>
						<li>
							<Link
								to='/seda/'
								className={styles.special}
								activeClassName={styles.activeMenuItem}>
								Seda
							</Link>
						</li>
						<li>
							<Link
								to='/over-ons/'
								activeClassName={styles.activeMenuItem}
								partiallyActive={true}>
								Over ons
							</Link>
							<ul>
								<li>
									<Link
										to='/over-ons/contact/'
										activeClassName={styles.activeMenuItem}>
										Contact
									</Link>
								</li>
								<li>
									<Link
										to='/over-ons/vacatures/'
										activeClassName={styles.activeMenuItem}
										partiallyActive={true}>
										Vacatures
									</Link>
								</li>
								<li>
									<Link
										to='/over-ons/anbi/'
										activeClassName={styles.activeMenuItem}>
										ANBI
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
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
