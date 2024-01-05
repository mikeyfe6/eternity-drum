import { GatsbyNode } from 'gatsby';

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
            gatsbyImageData: any;
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
        gatsbyImageData: any;
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


export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
        type ContentfulPost implements Node {
            slug: String
            tags: [String]
            title: String
            excerpt: Excerpt
            content: Content
            writer: Writer
            featuredImage: FeaturedImage
            publishedDate: String 
            postType: PostType
        }

        type ContentfulVacancy implements Node {
            slug: String
            jobTitle: String
            department: String
            jobImage: JobImage @dontInfer
            jobDescription: JobDescription
            organisationDetails: OrganisationDetails
            requirements: Requirements
            responsibilities: Responsibilities
            availability: Availability
            apply: Apply
            location: Location
            applicationDeadline: String
            contactEmail: String
            contactPhone: String
            id: String
        }

        type Excerpt {
            excerpt: String
        }

        type Content {
            raw: String
            references: [ContentfulAsset] @link(by: "contentful_id", from: "references___NODE")
        }

        type Writer {
            name: String
            email: String
        }

        type FeaturedImage {
            url: String
            title: String
        }

        type PostType {
            name: String
        }

        type JobImage {
            gatsbyImageData: JSON!
            title: String
            description: String
        }

        type JobDescription {
            raw: String
        }

        type OrganisationDetails {
            raw: String
        }

        type Requirements {
            raw: String
        }

        type Responsibilities {
            raw: String
        }

        type Availability {
            raw: String
        }

        type Apply {
            raw: String
        }

        type Location {
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
