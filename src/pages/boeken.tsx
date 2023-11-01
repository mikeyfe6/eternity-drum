import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import BookingsForm from '../components/bookingsForm';

const BoekenPage: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Boeken' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Boeken</h1>
				<BookingsForm />
			</section>
		</Layout>
	);
};

export default BoekenPage;

export const Head: HeadFC = () => <SEO title='Boeken' />;
