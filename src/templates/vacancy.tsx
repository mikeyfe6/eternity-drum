import React from 'react';

import type { HeadFC } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { SEO } from '../components/seo';

import Hero from '../components/heroslider';

// import { Link } from 'gatsby';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

interface PostProps {
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
}: PostProps) => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Drumworkshops', link: '/drumworkshops/' },
		{ label: 'Summerschool 2020' },
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
						{documentToReactComponents(JSON.parse(jobDescription.raw))}

						{documentToReactComponents(JSON.parse(organisationDetails.raw))}

						{documentToReactComponents(JSON.parse(requirements.raw))}

						{documentToReactComponents(JSON.parse(responsibilities.raw))}

						{documentToReactComponents(JSON.parse(availablity.raw))}

						{documentToReactComponents(JSON.parse(apply.raw))}

						{/* <p>{location.lat}</p>
						<p>{location.lon}</p> */}
						<br />
						{/* <p>{applicationDeadline}</p> */}
						<br />

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

export const Head: HeadFC = () => <SEO />;
