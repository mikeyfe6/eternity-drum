import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

const CultuurEducatie: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Cultuur Educatie' },
	];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Cultuureducatie</h1>
				<section data-main-content className='page-content-center'>
					<p>
						<strong>Eternity</strong> heeft de ambitie de komende jaren te
						groeien en een instituut te worden voor Caribische drumbands.
						Eternity wil met haar aanbod cultuureducatie zoveel mogelijk
						kinderen en jongeren bereiken, zowel met een onderwijs- als een
						naschoolsprogramma.
					</p>

					<p>
						<strong>Eternity</strong> verzorgt vooral in Amsterdam drumworkshops
						aan verschillende instellingen en organisaties. Jongeren doorlopen
						binnen Eternity een educatief traject, waarbij ze worden
						klaargestoomd tot artiest om uiteindelijk met de professionele
						drumband optredens te verzorgen. Hierbij vindt selectie plaats op
						basis van talent, houding en samenwerking binnen de band.
					</p>

					<p>
						Momenteel verzorgen wij diverse drumworkshops en lessen o.a. op het{' '}
						<a href='#!'>Bindelmeer College</a> en <a href='#!'>Bredeschool</a>{' '}
						in Amsterdam Zuidoost.
					</p>
				</section>
			</section>
		</Layout>
	);
};

export default CultuurEducatie;

export const Head: HeadFC = () => <SEO title='Cultuur Educatie' />;
