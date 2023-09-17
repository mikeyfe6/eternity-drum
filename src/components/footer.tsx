// src/components/Footer.js
import React from 'react';

import * as styles from '../styles/modules/footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footerContainer}>
			<div className={styles.footerWrapper}>
				<img
					src='https://eternitydrum.com/wp-content/uploads/brizy/imgs/LOGO-EP-1-256x222x0x16x256x190x1540867957.png'
					alt=''
					className={styles.footerLogo}
				/>
			</div>
		</footer>
	);
};

export default Footer;
