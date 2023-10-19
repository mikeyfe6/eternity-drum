import * as React from 'react';
import { Link } from 'gatsby';

import * as styles from '../styles/modules/mobilemenu.module.scss';

interface MobileMenuProps {
	isOpen: boolean;
	closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, closeMenu }) => {
	const [isSubMenu1Open, setIsSubMenu1Open] = React.useState(false);
	const [isSubMenu2Open, setIsSubMenu2Open] = React.useState(false);
	const [isSubMenu3Open, setIsSubMenu3Open] = React.useState(false);

	const menuClass = isOpen
		? `${styles.mobileMenu} ${styles.open}`
		: `${styles.mobileMenu} ${styles.close}`;

	const handleMenuItemClick = () => {
		closeMenu();
	};

	const toggleSubMenu1 = () => {
		setIsSubMenu1Open(!isSubMenu1Open);
	};

	const toggleSubMenu2 = () => {
		setIsSubMenu2Open(!isSubMenu2Open);
	};

	const toggleSubMenu3 = () => {
		setIsSubMenu3Open(!isSubMenu3Open);
	};

	return (
		<nav className={menuClass}>
			<div className={styles.closeWrapper} onClick={closeMenu}>
				<div className={styles.closeCross}>
					<div className={styles.crossLine} />
					<div className={styles.crossLine} />
				</div>
			</div>
			<ul>
				<li>
					<Link
						to='/'
						activeClassName={styles.activeMenuItem}
						onClick={handleMenuItemClick}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						to='/boeken/'
						activeClassName={styles.activeMenuItem}
						onClick={handleMenuItemClick}
					>
						Boeken
					</Link>
				</li>
				<li>
					<Link
						to='/drumworkshops/'
						activeClassName={styles.activeMenuItem}
						partiallyActive={true}
						onClick={handleMenuItemClick}
					>
						Drumworkshops
					</Link>
					<i
						className={`fa-solid fa-caret-${isSubMenu1Open ? 'up' : 'down'}`}
						onClick={toggleSubMenu1}
					/>
					{isSubMenu1Open && (
						<ul>
							<li>
								<Link
									to='/drumworkshops/summerschool-2022/'
									activeClassName={styles.activeMenuItem}
									onClick={handleMenuItemClick}
								>
									Eternity Summerschool 2022
								</Link>
							</li>
							<li>
								<Link
									to='/drumworkshops/summerschool-2023/'
									activeClassName={styles.activeMenuItem}
									onClick={handleMenuItemClick}
								>
									Eternity Summerschool 2023
								</Link>
							</li>
						</ul>
					)}
				</li>
				<li>
					<Link
						to='/cultuureducatie/'
						activeClassName={styles.activeMenuItem}
						onClick={handleMenuItemClick}
					>
						Cultuureducatie
					</Link>
				</li>
				<li>
					<Link
						to='/projecten/'
						activeClassName={styles.activeMenuItem}
						onClick={handleMenuItemClick}
					>
						Projecten
					</Link>
					<i
						className={`fa-solid fa-caret-${isSubMenu2Open ? 'up' : 'down'}`}
						onClick={toggleSubMenu2}
					/>
					{isSubMenu2Open && (
						<ul>
							<li>
								<Link
									to='/projecten/sankofa-academy/'
									activeClassName={styles.activeMenuItem}
									onClick={handleMenuItemClick}
								>
									Sankofa Academy
								</Link>
							</li>
						</ul>
					)}
				</li>
				<li>
					<Link
						to='/seda/'
						activeClassName={styles.activeMenuItem}
						onClick={handleMenuItemClick}
					>
						SEDA
					</Link>
				</li>
				<li>
					<Link
						to='/media/'
						activeClassName={styles.activeMenuItem}
						onClick={handleMenuItemClick}
					>
						Media
					</Link>
				</li>
				<li>
					<Link
						to='/over-ons/'
						activeClassName={styles.activeMenuItem}
						partiallyActive={true}
						onClick={handleMenuItemClick}
					>
						Over ons
					</Link>
					<i
						className={`fa-solid fa-caret-${isSubMenu3Open ? 'up' : 'down'}`}
						onClick={toggleSubMenu3}
					/>
					{isSubMenu3Open && (
						<ul>
							<li>
								<Link
									to='/over-ons/contact/'
									activeClassName={styles.activeMenuItem}
									onClick={handleMenuItemClick}
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									to='/over-ons/vacatures/'
									activeClassName={styles.activeMenuItem}
									onClick={handleMenuItemClick}
								>
									Vacatures
								</Link>
							</li>
							<li>
								<Link
									to='/over-ons/anbi/'
									activeClassName={styles.activeMenuItem}
									onClick={handleMenuItemClick}
								>
									ANBI
								</Link>
							</li>
						</ul>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default MobileMenu;
