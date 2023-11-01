import * as React from 'react';

import { Link, HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';

import * as styles from '../styles/modules/success.module.scss';

const Success: React.FC<PageProps> = () => {
	return (
		<Layout>
			<section data-main-section>
				<h1>Succes!</h1>
				<p>
					Je bericht is succesvol verstuurd! We nemen zo snel mogelijk contact
					met je op.
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
						<Link to='/'>Ga terug naar de homepagina</Link>.
					</button>
				</p>
			</section>
		</Layout>
	);
};

export default Success;

export const Head: HeadFC = () => (
	<SEO title='Succes! Je bericht is verstuurd!' />
);
