import React from 'react';

import { Link, HeadFC, PageProps } from 'gatsby';

import { Seo } from '../components/seo';

import * as styles from '../styles/modules/notfound.module.scss';

const NotFoundPage: React.FC<PageProps> = () => {
	return (
		<section data-main-section>
			<h1>Ojee.. Pagina niet gevonden</h1>
			<p>
				We hebben ons best gedaan, maar het lijkt erop dat deze pagina niet
				(meer) bestaat of misschien verhuisd is.
				<br />
				{process.env.NODE_ENV === 'development' ? (
					<>
						<br />
						Try creating a page in <code>src/pages/</code>.
						<br />
					</>
				) : null}
				<br />
				<button type='button' className={styles.notfoundButton}>
					<Link to='/'>Ga terug naar de homepagina..</Link>
				</button>
			</p>
		</section>
	);
};

export default NotFoundPage;

export const Head: HeadFC = () => (
	<Seo title='Pagina niet gevonden!' pathname='/404/' />
);
