/* eslint-disable indent */
import React from 'react';

import type { HeadProps } from 'gatsby';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { Seo } from '../components/seo';

import Layout from '../components/layout';

interface PostProps {
	pageContext: {
		slug: string;
		tags: string[];
		title: string;
		content: {
			raw: string;
		};
		writer: {
			name: string;
			email: string;
		};

		featuredImage: {
			url: string;
			title: string;
		};
	};
}

const Post = ({
	pageContext: { slug, tags, title, content, writer, featuredImage },
}: PostProps) => {
	return (
		<Layout>
			<h1>{title}</h1>

			<div>
				<strong>slug/url:</strong> {slug}
			</div>

			<br />

			<br />

			<div>
				<strong>content:</strong>
				{documentToReactComponents(JSON.parse(content.raw))}
			</div>

			<br />

			<ul>
				<strong>tags:</strong>
				{tags.map((tag, index) => (
					<li key={index}>{tag}</li>
				))}
			</ul>

			<br />

			<div>
				{writer && (
					<>
						<strong>Author email:</strong> {writer.email}
						<br />
						<strong>Author name:</strong> {writer.name}
					</>
				)}
			</div>

			<br />

			<strong>img:</strong>
			<br />
			<img src={featuredImage.url} alt={featuredImage.title} />
		</Layout>
	);
};

export default Post;

interface SeoContext {
	title: string;
}

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
	const pageTitle = (pageContext as SeoContext)?.title || '';
	return <Seo title={pageTitle} />;
};
