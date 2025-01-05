import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../components/seo';

import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

const Theater: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Theater' }];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Theater</h1>
				<p>Pagina komt binnenkort..</p>
			</section>
		</>
	);
};

export default Theater;

export const Head: HeadFC = () => <Seo title='Theater' pathname='/theater/' />;
