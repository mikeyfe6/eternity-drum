import { GatsbyNode } from 'gatsby';

import { IGatsbyImageData } from 'gatsby-plugin-image';

import path from 'path';

interface Post {
    slug: string;
    title: string;
    excerpt: {
        excerpt: string;
    };
    tags: string[];
    content: {
        raw: string;
        references: {
            __typename: string;
            contentful_id: string;
            gatsbyImageData: IGatsbyImageData;
            description: string;
            title: string;
            file: {
                url: string;
                fileName: string;
                details: {
                    size: number;
                    image: {
                        width: number;
                        height: number;
                    };
                };
            };
        }[];
    };
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
    id: string;
}

interface Vacancy {
    id: string;
    slug: string;
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
    }
    applicationDeadline: string;
    contactEmail: string;
    contactPhone: string;
}

interface QueryResult {
    allContentfulPost: {
        edges: {
            node: Post;
        }[];
    };
    allContentfulVacancy: {
        edges: {
            node: Vacancy
        }[];
    };
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions }) => {
    const { createTypes } = actions;

    const typeDefs = `
        type ContentfulPost implements Node @infer {
            id: ID!
            slug: String
            tags: [String]
            title: String
            excerpt: contentfulPostExcerptTextNode @link(by: "id", from: "excerpt___NODE")
            content: ContentfulPostContent
            writer: ContentfulAuthor @link(by: "id", from: "writer___NODE")
            featuredImage: ContentfulAsset @link(by: "id", from: "featuredImage___NODE")
            publishedDate: Date @dateformat
            updatedAt: Date @dateformat
            postType: [ContentfulCategory] @link(by: "id", from: "postType___NODE")
        }

        type contentfulPostExcerptTextNode implements Node @infer {
            excerpt: String
        }

        type ContentfulPostContent @infer {
            raw: String
            references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
        }

        type ContentfulVacancy implements Node @infer {
            id: ID!
            slug: String
            jobTitle: String
            jobImage: ContentfulAsset @link(by: "id", from: "jobImage___NODE")
            department: String
            jobDescription: ContentfulVacancyJobDescription
            organisationDetails: ContentfulVacancyOrganisationDetails
            requirements: ContentfulVacancyRequirements
            responsibilities: ContentfulVacancyResponsibilities
            availability: ContentfulVacancyAvailability
            apply: ContentfulVacancyApply
            location: ContentfulVacancyLocation
            applicationDeadline: Date @dateformat
            contactEmail: String
            contactPhone: String
            updatedAt: Date @dateformat
        }

        type ContentfulVacancyJobDescription @infer {
            raw: String
        }

        type ContentfulVacancyOrganisationDetails @infer {
            raw: String
        }

        type ContentfulVacancyRequirements @infer {
            raw: String
        }

        type ContentfulVacancyResponsibilities @infer {
            raw: String
        }

        type ContentfulVacancyAvailability @infer {
            raw: String
        }

        type ContentfulVacancyApply @infer {
            raw: String
        }

        type ContentfulVacancyLocation @infer {
            lat: Float
            lon: Float
        }
    `;

    createTypes(typeDefs);
};

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const postTemplate = path.resolve('./src/templates/post.tsx');
    const vacancyTemplate = path.resolve('./src/templates/vacancy.tsx');

    const postQueryResult = await graphql<QueryResult>(`
        query postQuery {
            allContentfulPost {
                edges {
                    node {
                        id
                        slug
                        tags
                        title
                        excerpt {
                            excerpt
                        }
                        content {
                            raw
                            references {
                                ... on ContentfulAsset {
                                    __typename
                                    contentful_id
                                    gatsbyImageData
                                    description
                                    title
                                    file {
                                        url
                                        fileName
                                        details {
                                            size
                                            image {
                                                width
                                                height
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        writer {
                            name
                            email
                        }
                        featuredImage {
                            url
                            title
                        }
                    }
                }
            }
        }
  `);

    if (postQueryResult.errors) {
        throw new Error(postQueryResult.errors.join(', '));
    }

    postQueryResult.data?.allContentfulPost.edges.forEach(({ node }) => {
        createPage({
            component: postTemplate,
            ownerNodeId: node.id,
            path: node.slug,
            context: {
                slug: node.slug,
                title: node.title,
                tags: node.tags,
                excerpt: node.excerpt.excerpt,
                content: node.content,
                writer: node.writer,
                featuredImage: node.featuredImage,
            },
        });
    });

    const vacancyQueryResult = await graphql<QueryResult>(`
    query VacancyQuery {
        allContentfulVacancy {
            edges {
              node {
                id
                slug
                jobTitle
                jobImage {
                    gatsbyImageData
                    title
                    description
                }
                department
                jobDescription {
                    raw
                }
                organisationDetails {
                  raw
                }
                department
                
                requirements {
                    raw
                }
                responsibilities {
                    raw
                }
                availability {
                    raw
                }
                apply {
                    raw
                }
                location {
                    lat
                    lon
                }
                applicationDeadline
                contactEmail
                contactPhone
              }
            }
        }
    }
  `);

    if (vacancyQueryResult.errors) {
        throw new Error(vacancyQueryResult.errors.join(', '));
    }

    vacancyQueryResult.data?.allContentfulVacancy.edges.forEach(({ node }) => {
        createPage({
            component: vacancyTemplate,
            ownerNodeId: node.id,
            path: `/over-ons/vacatures/${node.slug}/`,
            context: {
                slug: node.slug,
                jobTitle: node.jobTitle,
                jobImage: node.jobImage,
                department: node.department,
                jobDescription: node.jobDescription,
                organisationDetails: node.organisationDetails,
                responsibilities: node.responsibilities,
                requirements: node.requirements,
                availability: node.availability,
                apply: node.apply,
                location: node.location,
                applicationDeadline: node.applicationDeadline,
                contactEmail: node.contactEmail,
                contactPhone: node.contactPhone,
            },
        });
    });
};
