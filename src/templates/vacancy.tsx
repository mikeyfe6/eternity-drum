import React from 'react';

import type { HeadProps } from 'gatsby';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { Seo } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

interface VacancyProps {
	pageContext: {
		jobTitle: string;
		department: string;
		jobImage: {
			gatsbyImageData: any;
			title: string;
			description: string;
		};
		jobDescription: {
			raw: string;
		};
		organisationDetails: {
			raw: string;
		};
		requirements: {
			raw: string;
		};
		responsibilities: {
			raw: string;
		};
		availablity: {
			raw: string;
		};
		apply: {
			raw: string;
		};
		location: {
			lat: number;
			lon: number;
		};
		applicationDeadline: string;
		contactEmail: string;
		contactPhone: string;
	};
}
// jobImage: node.jobImage,

const Vacancy = ({
	pageContext: {
		jobTitle,
		jobImage,
		department,
		jobDescription,
		organisationDetails,
		requirements,
		responsibilities,
		availablity,
		apply,
		location,
		applicationDeadline,
		contactEmail,
		contactPhone,
	},
}: VacancyProps) => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Over Ons', link: '/over-ons/' },
		{ label: 'Vacatures', link: '/over-ons/vacatures/' },
		{ label: jobTitle },
	];

	const image = jobImage.gatsbyImageData
		? getImage(jobImage.gatsbyImageData)
		: null;

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />
				<h1>Vacature: {jobTitle}</h1>
				<section data-main-content className='page-content image-right'>
					<div>
						<h3>betreft vacature:</h3>
						{renderRichText(jobDescription)}

						{renderRichText(organisationDetails)}

						{renderRichText(requirements)}

						{renderRichText(responsibilities)}

						{renderRichText(availablity)}

						{renderRichText(apply)}

						{/* <p>{location.lat}</p>
						<p>{location.lon}</p> */}
						<br />
						{/* <p>{applicationDeadline}</p> */}

						<p>{department}</p>
					</div>
					<div>
						<div>
							<GatsbyImage image={image!} alt={jobImage.description} />
						</div>
						{/* <br /> */}
						{/* <div>
							<p>{contactEmail}</p>
							<br />
							<p>{contactPhone}</p>
						</div> */}
					</div>
				</section>
			</section>
		</Layout>
	);
};

export default Vacancy;

interface SeoContext {
	jobTitle: string;
}

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
	const pageTitle = (pageContext as SeoContext)?.jobTitle || '';
	return <Seo title={pageTitle} />;
};
