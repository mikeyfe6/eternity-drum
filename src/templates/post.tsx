/* eslint-disable indent */
import React from 'react';

import type { HeadProps } from 'gatsby';

import { BLOCKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { Seo } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

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
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: title }];

	const renderOptions = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET]: (node: any) => {
				const {
					data: { target: { title = '', file = { url: '' } } = {} } = {},
				} = node || {};

				const imageUrl = file && file.url ? file.url : '';
				const imageAlt = title && title ? title : '';

				if (imageUrl && imageAlt) {
					return <img alt={imageAlt} src={imageUrl} />;
				} else {
					return null;
				}
			},
		},
	};

	return (
		<Layout>
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>{title}</h1>

				<section data-main-content className='page-content singlepost'>
					<div>
						<div>
							<strong>content:</strong>
							{renderRichText(content, renderOptions)}
						</div>

						<br />

						<ul>
							<strong>tags:</strong>
							{tags.map((tag, index) => (
								<li key={index}>{tag}</li>
							))}
						</ul>

						<div>
							{writer && (
								<>
									<strong>Author email:</strong> {writer.email}
									<br />
									<strong>Author name:</strong> {writer.name}
								</>
							)}
						</div>
					</div>

					<div>
						<div>
							{' '}
							<img src={featuredImage.url} alt={featuredImage.title} />
						</div>
					</div>
				</section>
			</section>
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
