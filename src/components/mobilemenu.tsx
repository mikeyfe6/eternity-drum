// MobileMenu.tsx
import React from 'react';
import { Link } from 'gatsby';

import * as styles from '../styles/modules/mobilemenu.module.scss';

interface MobileMenuProps {
	isOpen: boolean;
	closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, closeMenu }) => {
	const menuClass = isOpen
		? `${styles.mobileMenu} ${styles.open}`
		: `${styles.mobileMenu} ${styles.close}`;

	return (
		<nav className={menuClass}>
			<button onClick={closeMenu}>Close</button>
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
					<Link to='/cultuureducatie/' activeClassName={styles.activeMenuItem}>
						Cultuureducatie
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
	);
};

export default MobileMenu;
