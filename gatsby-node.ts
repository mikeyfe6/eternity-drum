import { GatsbyNode } from 'gatsby';
import path from 'path';

interface Post {
    slug: string;
    title: string;
    tags: string[];
    content: {
        raw: string;
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
            content {
              raw
              references {
                ... on ContentfulAsset {
                  __typename
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
                applicationDeadline(formatString: "")
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
                availablity: node.availability,
                apply: node.apply,
                location: node.location,
                applicationDeadline: node.applicationDeadline,
                contactEmail: node.contactEmail,
                contactPhone: node.contactPhone,
            },
        });
    });
};
