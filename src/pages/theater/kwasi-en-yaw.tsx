import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../../components/seo';

import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

const KwasiEnYaw: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Theater', link: '/theater/' },
		{ label: 'Kwasi & Yaw' },
	];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Kwasi & Yaw</h1>
				<p>Pagina komt binnenkort..</p>
			</section>
		</>
	);
};

export default KwasiEnYaw;

export const Head: HeadFC = () => (
	<Seo title='Kwasi & Yaw' pathname='/theater/kwasi-en-yaw/' />
);
