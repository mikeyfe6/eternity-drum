import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../../components/seo';

import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

const SankofaSchool: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Projecten', link: '/projecten/' },
		{ label: 'Sankofa School' },
	];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>SEDA School</h1>
				<p>Pagina komt binnenkort..</p>
			</section>
		</>
	);
};

export default SankofaSchool;

export const Head: HeadFC = () => (
	<Seo title='Sankofa School' pathname='/projecten/sankofa-school/' />
);
