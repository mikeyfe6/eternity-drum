import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

const Projecten: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Projecten' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Projecten</h1>
				<p>Pagina onder constructie..</p>
			</section>
		</Layout>
	);
};

export default Projecten;

export const Head: HeadFC = () => <SEO title='Projecten' />;
