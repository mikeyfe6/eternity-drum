import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';

import Hero from '../components/hero';
import Sidebar from '../components/sidebar';

const DrumworkshopsPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<>
				<Hero />
				<h1>Drumworkshops</h1>
				<p>Welcome to your new Gatsby site.</p>
			</>
			<Sidebar />
		</Layout>
	);
};

export default DrumworkshopsPage;

export const Head: HeadFC = () => <SEO title='Drumworkshops' />;
