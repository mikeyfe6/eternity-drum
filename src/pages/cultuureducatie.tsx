import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";
import Hero from "../components/layout/heroslider";

const CultuurEducatie: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Cultuureducatie" },
	];

	return (
		<>
			<Hero />
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Cultuureducatie</h1>
			</section>
			<section data-main-section>
				<div data-main-content className="page-content center">
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
						Momenteel verzorgen wij drumlessen o.a. op het{" "}
						<a
							href="https://www.orioncollegezuidoost.nl"
							rel="noopener noreferrer"
							target="_blank"
						>
							Orion College
						</a>{" "}
						in Amsterdam Zuidoost.
					</p>
				</div>
			</section>
		</>
	);
};

export default CultuurEducatie;

export const Head: HeadFC = () => (
	<Seo
		title="Cultuureducatie"
		pathname="/cultuureducatie/"
		description="Ontdek Eternity's Cultuureducatie: educatieve en naschoolse drumworkshops in Amsterdam. Talentontwikkeling en optredens met professionele drumband."
	/>
);
