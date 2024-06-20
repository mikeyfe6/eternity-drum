import React from 'react';

import { Link, HeadFC, PageProps } from 'gatsby';

import { Seo } from '../components/seo';

import * as styles from '../styles/modules/success.module.scss';

const Success: React.FC<PageProps> = () => {
	return (
		<section data-main-section>
			<h1>Bedankt!</h1>
			<p>
				Je bericht is succesvol verstuurd! We nemen zo snel mogelijk contact met
				je op.
				<br />
				{process.env.NODE_ENV === 'development' ? (
					<>
						<br />
						<code>Je bent aan 't developen!</code>
						<br />
					</>
				) : null}
				<br />
				<button type='button' className={styles.succesButton}>
					<Link to='/'>Ga naar de homepagina</Link>
				</button>
			</p>
		</section>
	);
};

export default Success;

export const Head: HeadFC = () => (
	<Seo title='Succesvolle formulierzending!' pathname='/success/' />
);
