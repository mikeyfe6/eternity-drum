import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import Sidebar from '../components/sidebar';

const Projecten: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Projecten' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Projecten</h1>
				<p>Welcome to your new Gatsby site.</p>
			</section>

			<Sidebar />
		</Layout>
	);
};

export default Projecten;

export const Head: HeadFC = () => <SEO title='Projecten' />;
