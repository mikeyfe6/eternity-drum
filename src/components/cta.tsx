import React from 'react';

import { navigate } from 'gatsby';

import * as styles from '../styles/modules/cta.module.scss';

const CtaButtons: React.FC = () => {
	return (
		<section className={styles.ctaContainer}>
			<button
				type='button'
				onClick={() => {
					navigate('/boeken/');
				}}
			>
				Direct Boeken
			</button>
			<button
				type='button'
				onClick={() => {
					navigate('/drumworkshops/');
				}}
			>
				Aanmelden Drumworkshops
			</button>
			<button
				type='button'
				className={styles.specialButton}
				onClick={() => {
					navigate('/seda/');
				}}
			>
				SEDA
			</button>
		</section>
	);
};

export default CtaButtons;
