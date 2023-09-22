import * as React from 'react';
import { navigate } from 'gatsby';

import * as styles from '../styles/modules/cta.module.scss';

const CtaButtons: React.FC = () => {
	return (
		<section className={styles.ctaContainer}>
			<button
				onClick={() => {
					navigate('/boeken/');
				}}
			>
				Direct Boeken
			</button>
			<button
				onClick={() => {
					navigate('/drumworkshops/');
				}}
			>
				Aanmelden Drumworkshops
			</button>
			<button
				className={styles.specialButton}
				onClick={() => {
					navigate('/drumworkshops/summerschool-2023/');
				}}
			>
				Eternity Summerschool 2023
			</button>
		</section>
	);
};

export default CtaButtons;
