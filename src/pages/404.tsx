import * as React from 'react';

import { Link, HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';

const NotFoundPage: React.FC<PageProps> = () => {
	return (
		<Layout>
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
					<Link to='/'>Ga terug naar de homepagina..</Link>.
				</p>
			</section>
		</Layout>
	);
};

export default NotFoundPage;

export const Head: HeadFC = () => <SEO title='Pagina niet gevonden!' />;
