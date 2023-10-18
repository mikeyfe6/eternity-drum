import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

import * as styles from '../styles/modules/content.module.scss';

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

				<h1>Drumworkshops</h1>
				<div className={styles.pageContentCenter}>
					<p>
						<strong>Eternity</strong> heeft de ambitie de komende jaren te
						groeien en een instituut te worden voor Caribische drumbands.
						Eternity wil met haar aanbod cultuureducatie zoveel mogelijk
						kinderen en jongeren bereiken, zowel met een onderwijs- als een
						naschoolsprogramma.
					</p>
					<br />
					<p>
						<strong>Eternity</strong> verzorgt vooral in Amsterdam drumworkshops
						aan verschillende instellingen en organisaties. Jongeren doorlopen
						binnen Eternity een educatief traject, waarbij ze worden
						klaargestoomd tot artiest om uiteindelijk met de professionele
						drumband optredens te verzorgen. Hierbij vindt selectie plaats op
						basis van talent, houding en samenwerking binnen de band.
					</p>
					<br />
					<p>
						Momenteel verzorgen wij diverse drumworkshops en lessen o.a. op het
						Bindelmeer College en Bredeschool in Amsterdam Zuidoost.
					</p>
				</div>
			</section>
		</Layout>
	);
};

export default CultuurEducatie;

export const Head: HeadFC = () => <SEO title='Cultuur Educatie' />;
