import * as React from "react";

import { graphql, useStaticQuery, Link } from "gatsby";

import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

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
        gatsbyImageData: IGatsbyImageData;
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
            allContentfulPost(sort: { publishedDate: DESC }) {
                nodes {
                    content {
                        raw
                    }
                    featuredImage {
                        gatsbyImageData(width: 480)
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

    // hiding certian posts, but keep them on the overview
    const visiblePosts = posts.filter(
        (post) => post.slug !== "bijlmer-drum-festival-2024"
    );

    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    return (
        <section className={styles.posts}>
            <h2 className="page-subtitle">Berichten</h2>

            {visiblePosts.length > 0 ? (
                <ul>
                    {visiblePosts.map(
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

                            const formattedDateString =
                                formattedDate.toLocaleDateString(
                                    "nl-NL",
                                    options
                                );

                            const image = featuredImage?.gatsbyImageData
                                ? getImage(featuredImage.gatsbyImageData)
                                : null;

                            return (
                                <li key={id}>
                                    <Link to={`/nieuws/${slug}/`}>
                                        <GatsbyImage
                                            image={image!}
                                            alt={featuredImage.title}
                                            className={styles.postImage}
                                            objectPosition="top"
                                        />
                                    </Link>
                                    <div>
                                        <h3>
                                            <Link
                                                to={`/nieuws/${slug}/`}
                                                className={styles.postLink}
                                            >
                                                {title}
                                            </Link>
                                        </h3>

                                        <span>
                                            {postType.map((cato) => cato.name)}
                                        </span>
                                        <p>{excerpt.excerptText}</p>
                                        <hr />
                                        <div>
                                            <time
                                                dateTime={formattedDate.toISOString()}
                                            >
                                                {formattedDateString}
                                            </time>
                                            <Link to={`/nieuws/${slug}/`}>
                                                Lees meer...
                                            </Link>
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
