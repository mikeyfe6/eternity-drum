import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

const Contact: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Over Ons', link: '/over-ons/' },
		{ label: 'Contact' },
	];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Contact</h1>
				<p>Welcome to your new Gatsby site.</p>
			</section>
		</Layout>
	);
};

export default Contact;

export const Head: HeadFC = () => <SEO title='Contact' />;
