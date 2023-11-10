import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

const Seda: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'SEDA' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Seda</h1>
				<p>Pagina onder constructie..</p>
			</section>
		</Layout>
	);
};

export default Seda;

export const Head: HeadFC = () => <Seo title='Seda' />;
