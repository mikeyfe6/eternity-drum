import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';

import Hero from '../components/hero';
import CtaButtons from '../components/cta';
import Sidebar from '../components/sidebar';
import Actualiteiten from '../components/actual';
import Partners from '../components/partners';

import * as styles from '../styles/modules/index.module.scss';

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<Hero />
			<section className={styles.homepageContainer}>
				<CtaButtons />
				<h1>Eternity Percussion</h1>
				<p>
					Eternity wilt als culturele instelling een bijdrage leveren aan
					talentontwikkeling, cultuurparticipatie en visieverbreding van
					jongeren. Door inzet van jongeren in de eigen organisatie op vitale
					posities, biedt Eternity jongeren de gelegenheid om cultureel te
					ondernemen en participeren binnen de Nederlandse samenleving. Hét
					middel om dit te bereiken is muziekeducatie. De organisatie biedt
					muzikaal vormende programma’s aan waarin jongeren kennismaken met de
					Caribische drumstijl, hun talenten ontwikkelen en zich als artiest
					bekwamen.
				</p>
			</section>
			<Sidebar />
			<Actualiteiten />
			<Partners />
		</Layout>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
