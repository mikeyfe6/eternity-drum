import * as React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

import * as styles from '../styles/modules/actual.module.scss';

interface Post {
	title: string;
	slug: string;
	contentful_id: string;
	postType: boolean;
	publishedDate: string;
	featuredImage: {
		description: string;
		url: string;
		title: string;
	};
	content: {
		raw: any;
	};
	excerpt: {
		excerpt: string;
	};
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
					excerpt {
						excerpt
					}
					contentful_id
					slug
				}
			}
		}
	`);

	const posts: Post[] = data.allContentfulPost.nodes;

	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	return (
		<section className={styles.actualContainer}>
			<h2>Actualiteiten</h2>
			<ul>
				{posts.map(
					({
						title,
						contentful_id,
						postType,
						publishedDate,
						featuredImage,
						excerpt,
						slug,
					}) => {
						const formattedDate = new Date(publishedDate);

						const formattedDateString = formattedDate.toLocaleDateString(
							'nl-NL',
							options
						);
						const timeString = formattedDate.toLocaleTimeString('nl-NL', {
							hour: 'numeric',
							minute: 'numeric',
						});

						return (
							<li key={contentful_id}>
								<Link to={`${slug}`}>
									<img src={featuredImage.url} alt={featuredImage.title} />
								</Link>
								<div>
									<Link to={`${slug}`}>
										<h3>{title}</h3>
									</Link>
									{postType ? <span>NIEUWS</span> : <span>BLOG</span>}
									<p>{excerpt.excerpt}</p>
									<hr />
									<time dateTime={formattedDate.toISOString()}>
										{formattedDateString} · {timeString}
									</time>
									<a href={slug}>Lees meer...</a>
								</div>
							</li>
						);
					}
				)}
			</ul>
		</section>
	);
};

export default Actualiteiten;
