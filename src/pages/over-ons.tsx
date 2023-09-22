import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import Sidebar from '../components/sidebar';

const OverOns: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Over Ons' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Over Ons</h1>
				<p>Welcome to your new Gatsby site.</p>
			</section>

			<Sidebar />
		</Layout>
	);
};

export default OverOns;

export const Head: HeadFC = () => <SEO title='Over Ons' />;
