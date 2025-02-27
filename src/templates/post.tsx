/* eslint-disable indent */
import React from "react";

import type { HeadProps } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

import { BLOCKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";

interface PostProps {
	pageContext: {
		tags: string[];
		title: string;
		excerpt: string;
		content: {
			raw: string;
			references: any[];
		};
		writer: {
			name: string;
			email: string;
		};

		featuredImage: {
			gatsbyImageData: IGatsbyImageData;
			title: string;
		};
	};
}

const Post = ({
	pageContext: { tags, title, excerpt, content, writer, featuredImage },
}: PostProps) => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Over Ons", link: "/over-ons/" },
		{ label: "Nieuws", link: "/over-ons/nieuws/" },
		{ label: title },
	];

	const renderOptions = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET]: (node: any) => {
				const {
					data: {
						target: {
							title: nodeTitle = "",
							description: nodeDescription = "",
							gatsbyImageData,
						},
					},
				} = node || {};

				if (gatsbyImageData) {
					return (
						<div className="singlepost images">
							<GatsbyImage
								image={gatsbyImageData as IGatsbyImageData}
								alt={nodeTitle}
							/>
							<span>{nodeTitle}</span>
							<span>{nodeDescription}</span>
						</div>
					);
				} else {
					return null;
				}
			},
		},
		renderText: (text: any) => {
			return text
				.split("\n")
				.reduce((children: any, textSegment: any, index: any) => {
					return [...children, index > 0 && <br key={index} />, textSegment];
				}, []);
		},
	};

	const image = featuredImage?.gatsbyImageData
		? getImage(featuredImage.gatsbyImageData)
		: null;

	return (
		<>
			<hr className="fullwidth" />

			<section className="page-intro post-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">{title}</h1>
			</section>

			<article data-main-section id="post-template">
				<div data-main-content className="page-content singlepost">
					<div>
						<h2>{excerpt}</h2>

						<div>{renderRichText(content, renderOptions)}</div>
					</div>

					<div>
						<GatsbyImage image={image!} alt={featuredImage.title} />

						{/* <div className='singlepost sidebar'>
						<ul>
                            {tags.map((tag, index) => (
                                <li key={index}>{tag}</li>
                            ))}
                        </ul>

						{writer && (
							<p>
								<u>Auteursinformatie</u>
								naam:<strong> {writer.name}</strong> <br />
								email:<strong> {writer.email}</strong>
							</p>
						)}
					</div> */}
					</div>
				</div>
			</article>
		</>
	);
};

export default Post;

interface SeoContext {
	title: string;
	excerpt: string;
	tags: string;
	slug: string;
	featuredImage: {
		url: string;
	};
}

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
	const pageTitle = (pageContext as SeoContext)?.title || "";
	const pageDescription = (pageContext as SeoContext)?.excerpt || "";
	const pageTags = (pageContext as SeoContext)?.tags || [];
	const pageSlug = (pageContext as SeoContext)?.slug || "";
	const pageImage = (pageContext as SeoContext)?.featuredImage.url || "";

	const tagsArray: string[] = Array.isArray(pageTags) ? pageTags : [];

	const pageKeywords = tagsArray.join(", ");

	return (
		<Seo
			title={pageTitle}
			keywords={pageKeywords}
			description={pageDescription}
			pathname={"/" + pageSlug + "/"}
			image={pageImage}
			article={true}
		/>
	);
};
