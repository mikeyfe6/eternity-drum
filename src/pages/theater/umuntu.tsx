import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../../components/seo';

import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

const Umuntu: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Theater', link: '/theater/' }, { label: 'Umuntu' }];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Umuntu</h1>
				<p>Pagina komt binnenkort..</p>
			</section>
		</>
	);
};

export default Umuntu;

export const Head: HeadFC = () => <Seo title='Umuntu' pathname='/theater/umuntu/' />;
