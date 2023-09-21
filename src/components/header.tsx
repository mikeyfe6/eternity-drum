import * as React from 'react';

import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { useSiteMetadata } from '../hooks/use-site-metadata';

import * as styles from '../styles/modules/header.module.scss';

interface HeaderProps {
	openMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ openMobileMenu }) => {
	const [isHeaderFixed, setIsHeaderFixed] = React.useState(false);

	const { title, facebookUrl, instagramUrl, linkedinUrl, youtubeUrl } =
		useSiteMetadata();

	React.useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 46) {
				setIsHeaderFixed(true);
			} else {
				setIsHeaderFixed(false);
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
						<p>The Leaders of Tomorrow</p>
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
									target='_blank'
								>
									<i className='fab fa-instagram' />
								</a>
							</li>
							<li>
								<a href={linkedinUrl} rel='noopener noreferrer' target='_blank'>
									<i className='fab fa-linkedin' />
								</a>
							</li>
							<li>
								<a href={youtubeUrl} rel='noopener noreferrer' target='_blank'>
									<i className='fab fa-youtube' />
								</a>
							</li>
						</ul>
					</div>
				</div>

				{isHeaderFixed && <div className={styles.headerSpace} />}

				<nav className={menuSwitchClass}>
					<div className={styles.mobileMenuContainer}>
						<button onClick={openMobileMenu} className={styles.hamburgerButton}>
							<div className={styles.hamburgerIcon}>
								<div className={styles.bar} />
								<div className={styles.bar} />
								<div className={styles.bar} />
							</div>
						</button>

						<div className={styles.mobileLogo}>
							<Link to='/'>
								<StaticImage
									src='../images/logo/ep-logo.png'
									alt={`${title} Logo`}
									placeholder='dominantColor'
									objectFit='contain'
									imgClassName={styles.mobileLogo}
								/>
							</Link>
						</div>
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
								partiallyActive={true}
							>
								Drumworkshops
							</Link>
							<ul>
								<li>
									<Link
										to='/drumworkshops/sankofa-academy/'
										activeClassName={styles.activeMenuItem}
									>
										Sankofa Academy
									</Link>
								</li>
								<li>
									<Link
										to='/drumworkshops/summerschool-2022/'
										activeClassName={styles.activeMenuItem}
									>
										Eternity Summerschool 2022
									</Link>
								</li>
								<li>
									<Link
										to='/drumworkshops/summerschool-2023/'
										activeClassName={styles.activeMenuItem}
									>
										Eternity Summerschool 2023
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link
								to='/cultuureducatie/'
								activeClassName={styles.activeMenuItem}
							>
								Cultuureducatie
							</Link>
						</li>
						<li>
							<Link to='/' className={styles.logoWrapper}>
								<StaticImage
									src='../images/logo/ep-logo.png'
									alt={`${title} Logo`}
									placeholder='dominantColor'
									style={{ width: '100%', minWidth: '250px' }} // Adjust maxWidth as needed
								/>
							</Link>
						</li>
						<li>
							<Link to='/projecten/' activeClassName={styles.activeMenuItem}>
								Projecten
							</Link>
						</li>
						<li>
							<Link to='/vacatures/' activeClassName={styles.activeMenuItem}>
								Vacatures
							</Link>
						</li>
						<li>
							<Link to='/media/' activeClassName={styles.activeMenuItem}>
								Media
							</Link>
						</li>
						<li>
							<Link
								to='/over-ons/'
								activeClassName={styles.activeMenuItem}
								partiallyActive={true}
							>
								Over ons
							</Link>
							<ul>
								<li>
									<Link
										to='/over-ons/contact/'
										activeClassName={styles.activeMenuItem}
									>
										Contact
									</Link>
								</li>
								<li>
									<Link
										to='/over-ons/anbi/'
										activeClassName={styles.activeMenuItem}
									>
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
