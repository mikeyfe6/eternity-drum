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
	console.log('tags', tags);
	console.log('writer', writer);

	return (
		<Layout>
			<h1>PAGE in de making !</h1>

			<div>
				<strong>slug/url:</strong> {slug}
			</div>

			<br />

			<div>
				<strong>title:</strong> {title}
			</div>

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
				<strong>author email:</strong> {writer.email}
			</div>
			<div>
				<strong>author name: </strong>
				{writer.name}
			</div>

			<br />

			<strong>img:</strong>
			<br />
			<img src={featuredImage.url} alt={featuredImage.title} />
		</Layout>
	);
};
export default Post;

export const Head: HeadFC = () => <SEO />;
