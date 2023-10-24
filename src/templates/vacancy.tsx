/* eslint-disable indent */
import React from 'react';

import type { HeadFC } from 'gatsby';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { SEO } from '../components/seo';

// import { Link } from 'gatsby';

import Layout from '../components/layout';

interface PostProps {
	pageContext: {
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
		slug,
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
	return (
		<Layout>
			<h1>Vacature: {jobTitle}</h1>
			<br />
			<p>{slug}</p>
			<br />
			<p>{department}</p>
			<br />
			<img src={jobImage.url} />
			<br />
			<br />
			{documentToReactComponents(JSON.parse(jobDescription.raw))}
			<br />
			{documentToReactComponents(JSON.parse(organisationDetails.raw))}
			<br />
			{documentToReactComponents(JSON.parse(requirements.raw))}
			<br />
			{documentToReactComponents(JSON.parse(responsibilities.raw))}
			<br />
			{documentToReactComponents(JSON.parse(availablity.raw))}
			<br />
			{documentToReactComponents(JSON.parse(apply.raw))}
			<br />
			<p>{location.lat}</p>
			<p>{location.lon}</p>
			<br />
			<p>{applicationDeadline}</p>
			<br />
			<p>{contactEmail}</p>
			<br />
			<p>{contactPhone}</p>
		</Layout>
	);
};
export default Vacancy;

export const Head: HeadFC = () => <SEO />;
