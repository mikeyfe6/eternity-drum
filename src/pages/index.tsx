import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import { Seo } from "../components/seo";

import Hero from "../components/layout/heroslider";
import CtaButtons from "../components/ui/cta";
import Collapsible from "../components/ui/actual";
import Berichten from "../components/ui/posts";
import Courses from "../components/ui/courses";
import Partners from "../components/ui/partners";
import WhiteSpace from "../components/layout/whitespace";

import * as styles from "../styles/modules/pages/index.module.scss";

const Index: React.FC<PageProps> = () => {
	const { title } = useSiteMetadata();

	return (
		<>
			<Hero />
			<section className={styles.homepage} data-main-section>
				<CtaButtons />
				<h1>{title}</h1>
				<p>
					Eternity wilt als culturele instelling een bijdrage leveren aan
					talentontwikkeling, cultuurparticipatie en visieverbreding van
					jongeren. Door inzet van jongeren in de eigen organisatie op vitale
					posities, biedt Eternity jongeren de gelegenheid om cultureel te
					ondernemen en participeren binnen de Nederlandse samenleving.
				</p>
				<p>
					Hét middel om dit te bereiken is muziekeducatie. De organisatie biedt
					muzikaal vormende programma’s aan waarin jongeren kennismaken met de
					Caribische drumstijl, hun talenten ontwikkelen en zich als artiest
					bekwamen.
				</p>
			</section>
			<WhiteSpace />
			<Collapsible />
			<WhiteSpace />
			<Berichten />
			<WhiteSpace />
			<Courses />
			<WhiteSpace />
			<Partners />
		</>
	);
};

export default Index;

export const Head: HeadFC = () => <Seo />;
