import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

const SummerschoolSecond: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Drumworkshops', link: '/drumworkshops/' },
		{ label: 'Summerschool 2021' },
	];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Summerschool 2021</h1>
				<p>Welcome to your new Gatsby site.</p>
			</section>
		</Layout>
	);
};

export default SummerschoolSecond;

export const Head: HeadFC = () => <SEO title='Summerschool 2021' />;
