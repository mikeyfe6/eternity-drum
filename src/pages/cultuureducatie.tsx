import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import Sidebar from '../components/sidebar';

const CultuurEducatie: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Cultuur Educatie' },
	];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Cultuur Educatie</h1>
				<p>Welcome to your new Gatsby site.</p>
			</section>

			<Sidebar />
		</Layout>
	);
};

export default CultuurEducatie;

export const Head: HeadFC = () => <SEO title='Cultuur Educatie' />;
