import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';
import Sidebar from '../../components/sidebar';

const Anbi: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Over Ons', link: '/over-ons/' },
		{ label: 'ANBI' },
	];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>ANBI</h1>
				<p>Welcome to your new Gatsby site.</p>
			</section>
			<Sidebar />
		</Layout>
	);
};

export default Anbi;

export const Head: HeadFC = () => <SEO title='ANBI' />;
