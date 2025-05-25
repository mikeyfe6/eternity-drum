import { GatsbyNode } from 'gatsby';

import { IGatsbyImageData } from 'gatsby-plugin-image';

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

import path from 'path';

import { createRemoteFileNode } from 'gatsby-source-filesystem';

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
        gatsbyImageData: IGatsbyImageData;
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

interface File {
    title: string;
    src: string;
    ext: string;
}

const s3 = new S3Client({
    region: process.env.GATSBY_AWS_EP_REGION ?? '',
    credentials: {
        accessKeyId: process.env.GATSBY_AWS_EP_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.GATSBY_AWS_EP_SECRET_ACCESS_KEY ?? '',
    }
});

const fetchS3Files = async (bucketName: string, prefix: string, fileTypes: string[]): Promise<File[]> => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        });

        const data = await s3.send(command);

        if (data.Contents) {
            return data.Contents
                .filter((object) => object.Key && fileTypes.includes(path.extname(object.Key ?? '').toLowerCase()))
                .map((object) => {
                    const fullTitle = object.Key?.split('/').pop() ?? 'Untitled';
                    const encodedUrl = encodeURI(`${process.env.GATSBY_AWS_URL ?? ''}${object.Key ?? ''}`);

                    return {
                        title: fullTitle,
                        src: encodedUrl,
                        ext: path.extname(object.Key ?? '').toLowerCase(),
                    };
                });
        } else {
            console.error('No contents found in the bucket.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching files from S3:', error);
        return [];
    }
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId, createContentDigest, getCache }) => {
    const { createNode } = actions;
    const bucketName = process.env.GATSBY_AWS_EP_BUCKET_NAME ?? '';
    const imagePrefixes = [
        'photos/swazoomlive-080723/',
        'photos/swazoomlive-031222/',
        'photos/bijlmeronstage-181222/',
        'photos/epinuk-01/',
        'photos/adpaf-101119/',
        'photos/adpaf-141121/',
        'photos/pulseandbeat-01/',
        'photos/beatit-01/'
    ];
    const musicPrefix = 'music/';
    const imageFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const musicFileTypes = ['.mp3', '.wav'];

    for (const prefix of imagePrefixes) {
        const folderName = path.basename(prefix);
        const files = await fetchS3Files(bucketName, prefix, imageFileTypes);

        for (const file of files) {
            const nodeId = createNodeId(`s3-image-file-${folderName}-${file.title}`);

            const fileNode = await createRemoteFileNode({
                url: file.src,
                parentNodeId: nodeId,
                createNode,
                createNodeId,
                getCache,
            });

            createNode({
                ...file,
                id: nodeId,
                parent: null,
                children: [],
                internal: {
                    type: 'S3ImageFile',
                    contentDigest: createContentDigest(file.src),
                },
                folderName,
                file___NODE: fileNode?.id,
            });
        }
    }

    const musicFolderName = path.basename(musicPrefix);
    const musicFiles = await fetchS3Files(bucketName, musicPrefix, musicFileTypes);

    for (const file of musicFiles) {
        const nodeId = createNodeId(`s3-music-file-${musicFolderName}-${file.title}`);
        createNode({
            ...file,
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: 'S3MusicFile',
                contentDigest: createContentDigest(file.src),
            },
            folderName: musicFolderName,
        });
    }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions }) => {
    const { createTypes } = actions;

    const typeDefs = `
        type S3ImageFile implements Node @infer {
            id: ID!
            title: String
            src: String
            ext: String
            folderName: String
            file: File @link(from: "file___NODE")
        }

        type S3MusicFile implements Node @infer {
            id: ID!
            title: String
            src: String
            ext: String
            folderName: String
        }

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
                            gatsbyImageData(layout: FULL_WIDTH)
                            title
                            url
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
            path: `/nieuws/${node.slug}/`,
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
