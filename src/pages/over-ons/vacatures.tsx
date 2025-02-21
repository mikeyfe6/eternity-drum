import React from "react";

import { graphql, useStaticQuery, Link } from "gatsby";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import * as styles from "../../styles/modules/templates/vacancy.module.scss";

interface Vacancy {
	id: string;
	slug: string;
	jobTitle: string;
	department: string;
	jobImage: {
		url: string;
		title: string;
		description: string;
	};
	jobDescription: {
		raw: string;
	};
	organisationDetails: {
		raw: string;
	};
	location: {
		lat: number;
		lon: number;
	};
	applicationDeadline: string;
}

const Vacatures: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Over Ons", link: "/over-ons/" },
		{ label: "Vacatures" },
	];

	const data = useStaticQuery(graphql`
		query {
			allContentfulVacancy {
				nodes {
					id
					slug
					jobTitle
				}
			}
		}
	`);

	const vacancies: Vacancy[] = data.allContentfulVacancy.nodes;

	return (
		<>
			<Hero />
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Vacatures</h1>
			</section>
			<section data-main-section>
				<hr />
				<br />
				<br />

				{/* // bloaty af! */}

				{vacancies.length > 0 ? (
					<ul className={styles.vacancies}>
						{vacancies.map(({ slug, jobTitle, id }) => {
							return (
								<li key={id}>
									<Link to={`${slug}/`}>
										<strong>{jobTitle}</strong> <span>&#8594;</span>
									</Link>
								</li>
							);
						})}
					</ul>
				) : (
					<p>Momenteel geen vacatures...</p>
				)}
			</section>
		</>
	);
};

export default Vacatures;

export const Head: HeadFC = () => (
	<Seo
		title="Vacatures"
		pathname="/over-ons/vacatures/"
		description="Ontdek onze nieuwste vacatures! Kijk naar open posities en kansen om bij ons in Amsterdam Zuidoost te werken. Solliciteer vandaag nog en sluit je aan bij ons team!"
	/>
);
