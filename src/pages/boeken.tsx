import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import Sidebar from '../components/sidebar';

const BoekenPage: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Boeken' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Boeken</h1>
				<p>Welcome to your new Gatsby site.</p>
				<br />
				<p>
					What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
					and typesetting industry. Lorem Ipsum has been the industry's standard
					dummy text ever since the 1500s, when an unknown printer took a galley
					of type and scrambled it to make a type specimen book. It has survived
					not only five centuries, but also the leap into electronic
					typesetting, remaining essentially unchanged. It was popularised in
					the 1960s with the release of Letraset sheets containing Lorem Ipsum
					passages, and more recently with desktop publishing software like
					Aldus PageMaker including versions of Lorem Ipsum.
				</p>
				<br />
				<p>
					Where can I get some? There are many variations of passages of Lorem
					Ipsum available, but the majority have suffered alteration in some
					form, by injected humour, or randomised words which don't look even
					slightly believable. If you are going to use a passage of Lorem Ipsum,
					you need to be sure there isn't anything embarrassing hidden in the
					middle of text. All the Lorem Ipsum generators on the Internet tend to
					repeat predefined chunks as necessary, making this the first true
					generator on the Internet. It uses a dictionary of over 200 Latin
					words, combined with a handful of model sentence structures, to
					generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
					is therefore always free from repetition, injected humour, or
					non-characteristic words etc.
				</p>
			</section>
			<Sidebar />
		</Layout>
	);
};

export default BoekenPage;

export const Head: HeadFC = () => <SEO title='Boeken' />;
