import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../components/seo';

import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import BookingsForm from '../components/bookingsForm';

const BoekenPage: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Boeken' }];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Boeken</h1>
				<BookingsForm />
			</section>
		</>
	);
};

export default BoekenPage;

export const Head: HeadFC = () => <Seo title='Boeken' />;
