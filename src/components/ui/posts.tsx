import React from "react";

import { graphql, useStaticQuery, Link } from "gatsby";

import * as styles from "../../styles/modules/components/posts.module.scss";

interface Post {
	title: string;
	slug: string;
	id: string;
	postType: [
		{
			name?: string;
		}
	];
	publishedDate: string;
	featuredImage: {
		// description: string;
		url: string;
		title: string;
	};
	content: {
		raw: any;
	};
	excerpt: {
		excerptText: string;
	};
}

const Berichten: React.FC = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulPost {
				nodes {
					content {
						raw
					}
					featuredImage {
						url
						title
					}
					postType {
						name
					}
					publishedDate
					title
					tags
					excerpt {
						excerptText: excerpt
					}
					id
					slug
				}
			}
		}
	`);

	const posts: Post[] = data.allContentfulPost.nodes;

	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	return (
		<section className={styles.posts}>
			<h2>Berichten</h2>

			{posts.length > 0 ? (
				<ul>
					{posts.map(
						({
							title,
							id,
							postType,
							publishedDate,
							featuredImage,
							excerpt,
							slug,
						}) => {
							const formattedDate = new Date(publishedDate);

							const formattedDateString = formattedDate.toLocaleDateString(
								"nl-NL",
								options
							);

							return (
								<li key={id}>
									<Link to={`${slug}/`}>
										{/* TODO: StaticImage */}
										<img
											src={featuredImage.url}
											alt={featuredImage.title}
											className={styles.postImage}
										/>
									</Link>
									<div>
										<h3>
											<Link to={`${slug}/`} className={styles.postLink}>
												{title}
											</Link>
										</h3>

										<span>{postType.map((cato) => cato.name)}</span>
										<p>{excerpt.excerptText}</p>
										<hr />
										<div>
											<time dateTime={formattedDate.toISOString()}>
												{formattedDateString}
											</time>
											<Link to={`${slug}/`}>Lees meer...</Link>
										</div>
									</div>
								</li>
							);
						}
					)}
				</ul>
			) : (
				<p>(Nog) geen berichten...</p>
			)}
		</section>
	);
};

export default Berichten;
