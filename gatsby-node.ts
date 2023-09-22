import { GatsbyNode } from 'gatsby';
import path from 'path';

interface Node {
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
    ]
    featuredImage: {
        url: string;
        title: string;
    };
    id: string;
}

interface QueryResult {
    allContentfulPost: {
        edges: {
            node: {
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
                ]
                featuredImage: {
                    url: string;
                    title: string;
                };
                id: string;
            }
        }[];
    };
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const postTemplate = path.resolve('./src/templates/post.tsx');
    const res = await graphql<QueryResult>(`
        query {
            allContentfulPost {
                edges {
                    node {
                        slug
                        tags
                        title
                        content {
                             raw
                        }
                        id
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

    if (res.errors) {
        throw new Error(res.errors.join(', '));
    }

    res.data?.allContentfulPost.edges.forEach(({ node }: { node: Node }) => {
        createPage({
            component: postTemplate,
            ownerNodeId: node.id,
            path: node.slug,
            context: {
                slug: node.slug,
                title: node.title,
                tags: node.tags,
                id: node.id,
                content: node.content,
                writer: node.writer,
                featuredImage: node.featuredImage,
            },
        });
    });
};
