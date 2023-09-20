import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/hero';
import Sidebar from '../components/sidebar';

const DrumworkshopsPage: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Drumworkshops' },
	];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Drumworkshops</h1>
				<p>Welcome to your new Gatsby site.</p>
			</section>

			<Sidebar />
		</Layout>
	);
};

export default DrumworkshopsPage;

export const Head: HeadFC = () => <SEO title='Drumworkshops' />;
