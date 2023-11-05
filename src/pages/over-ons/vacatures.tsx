import * as React from 'react';

import { graphql, useStaticQuery, Link } from 'gatsby';

import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

import * as styles from '../../styles/modules/vacancy.module.scss';

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
		{ label: 'Home', link: '/' },
		{ label: 'Over Ons', link: '/over-ons/' },
		{ label: 'Vacatures' },
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
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Vacatures</h1>

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
			</section>
		</Layout>
	);
};

export default Vacatures;

export const Head: HeadFC = () => <SEO title='Vacatures' />;
