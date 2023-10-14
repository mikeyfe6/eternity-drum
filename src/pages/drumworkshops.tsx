import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import RegisterForm from '../components/registerform';

const Drumworkshops: React.FC<PageProps> = () => {
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
				<RegisterForm />
			</section>
		</Layout>
	);
};

export default Drumworkshops;

export const Head: HeadFC = () => <SEO title='Drumworkshops' />;
