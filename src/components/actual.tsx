import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import * as styles from '../styles/modules/actual.module.scss';

interface Post {
	contentful_id: string;
	title: string;
	postType: boolean;
	publishedDate: string;
}

const Actualiteiten: React.FC = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulPost {
				nodes {
					content {
						raw
					}
					createdAt
					featuredImage {
						description
						url
						title
					}
					postType
					publishedDate
					title
					tags
					contentful_id
				}
			}
		}
	`);

	const posts: Post[] = data.allContentfulPost.nodes;

	console.log(posts);

	return (
		<section className={styles.actualContainer}>
			<ul>
				{posts.map(({ title, contentful_id, postType, publishedDate }) => (
					<li key={contentful_id}>
						<h2>{title}</h2>
						{postType ? (
							<p>This is a special NEWS type.</p>
						) : (
							<p>This is a regular BLOG type.</p>
						)}
						<time>{publishedDate}</time>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Actualiteiten;
