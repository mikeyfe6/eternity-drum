import React from "react";

import type { HeadProps } from "gatsby";

import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";

interface VacancyProps {
	pageContext: {
		jobTitle: string;
		department: string;
		jobImage: {
			gatsbyImageData: IGatsbyImageData;
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
		availability: {
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

const Vacancy = ({
	pageContext: {
		jobTitle,
		jobImage,
		department,
		jobDescription,
		organisationDetails,
		requirements,
		responsibilities,
		availability,
		apply,
		location,
		applicationDeadline,
		contactEmail,
		contactPhone,
	},
}: VacancyProps) => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Over Ons", link: "/over-ons/" },
		{ label: "Vacatures", link: "/over-ons/vacatures/" },
		{ label: jobTitle },
	];

	const image = jobImage?.gatsbyImageData
		? getImage(jobImage.gatsbyImageData)
		: null;

	return (
		<>
			<section className="page-intro post-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Vacature: {jobTitle}</h1>
			</section>
			<section data-main-section>
				<div data-main-content className="page-content image-right">
					<div>
						<h3>betreft vacature:</h3>
						{renderRichText(jobDescription)}

						{renderRichText(organisationDetails)}

						{renderRichText(requirements)}

						{renderRichText(responsibilities)}

						{renderRichText(availability)}

						{renderRichText(apply)}

						<br />

						<p>{department}</p>
					</div>
					<div>
						<div>
							<GatsbyImage image={image!} alt={jobImage.description} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Vacancy;

interface SeoContext {
	jobTitle: string;
}

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
	const pageTitle = (pageContext as SeoContext)?.jobTitle || "";
	return <Seo title={pageTitle} />;
};
