import * as React from 'react';

import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/header.module.scss';

const Header: React.FC = () => {
	const [isHeaderFixed, setIsHeaderFixed] = React.useState(false);

	// const data = useStaticQuery(graphql`
	// 	query {
	// 		contentfulAuthor {
	// 			naam
	// 		}
	// 	}
	// `);

	// const author = data.contentfulAuthor;

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
								<i className='fab fa-facebook fa-inverse'></i>
							</li>
							<li>
								<i className='fab fa-instagram fa-inverse'></i>
							</li>
							<li>
								<i className='fab fa-youtube fa-inverse'></i>
							</li>
						</ul>
					</div>
				</div>
				{isHeaderFixed && <div style={{ height: '125px' }} />}
				<nav className={menuSwitchClass}>
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
						</li>
						<li>
							<a href='#'>Cultuureducatie</a>
						</li>
						<li className={styles.epLogo}>
							<StaticImage
								src='../images/logo/ep-logo.png'
								alt='Logo'
								placeholder='dominantColor'
							/>
						</li>
						<li>
							<a href='#'>Projecten</a>
						</li>
						<li>
							<a href='#'>Vacatures</a>
						</li>
						<li>
							<a href='#'>Media</a>
						</li>
						<li>
							<a href='#'>Over ons</a>
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
