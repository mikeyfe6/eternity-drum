import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../components/seo';

import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

const CultuurEducatie: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Cultuureducatie' },
	];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Cultuureducatie</h1>
				<section data-main-content className='page-content center'>
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
						<a
							href='https://www.bindelmeercollege.nl/'
							rel='noopener noreferrer'
							target='_blank'
						>
							Bindelmeer College
						</a>{' '}
						en{' '}
						<a
							href='https://bredeschoolzuidoost.nl/'
							rel='noopener noreferrer'
							target='_blank'
						>
							Bredeschool Zuidoost
						</a>{' '}
						in Amsterdam Zuidoost.
					</p>
				</section>
			</section>
		</>
	);
};

export default CultuurEducatie;

export const Head: HeadFC = () => (
	<Seo
		title='Cultuureducatie'
		description="Dompel jezelf onder in de wereld van Caribische drumbands met Eternity's Cultuureducatie programma. Ontdek hoe we kinderen en jongeren bereiken door educatieve en naschoolse drumworkshops aan te bieden in Amsterdam. Een educatief traject dat talent, houding en samenwerking in de band stimuleert, leidt tot optredens met onze professionele drumband. Ontdek onze workshops op verschillende instellingen zoals het Bindelmeer College en Bredeschool Zuidoost."
	/>
);
