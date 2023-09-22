/* eslint-disable indent */
import React from 'react';

import type { HeadFC } from 'gatsby';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { SEO } from '../components/seo';

// import { Link } from 'gatsby';

import Layout from '../components/layout';

// CONTENTFUL topics genereren
interface PostProps {
	pageContext: {
		slug: string;
		tags: string[];
		title: string;
		content: {
			raw: string;
		};
		id: string;
		writer: [
			{
				name: string;
				email: string;
			}
		];
		featuredImage: {
			url: string;
			title: string;
		};
	};
}

const Post = ({
	pageContext: { slug, tags, title, content, id, writer, featuredImage },
}: PostProps) => {
	console.log('tags', tags);
	console.log('tags', writer);

	return (
		<Layout>
			<h1>PAGE in de making !</h1>
			<div>{slug}</div>
			<div>{title}</div>
			<div>{documentToReactComponents(JSON.parse(content.raw))}</div>
			<div>{id}</div>
			<img src={featuredImage.url} alt={featuredImage.title} />
		</Layout>
	);
};
export default Post;

export const Head: HeadFC = () => <SEO />;
