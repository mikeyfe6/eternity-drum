import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface SrcImagesQuery {
	summerschool2021: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	midzomerlatest: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	summerschool2020: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	midzomer: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	sankofaB: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	sankofaF: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	rotpF: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	rotpB: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	allPartners: {
		nodes: {
			relativePath: string;
			childImageSharp: {
				gatsbyImageData: IGatsbyImageData;
			};
		}[];
	};
	kwasiAndYaw: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	seda: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
}

export const useSrcImages = () => {
	const data = useStaticQuery<SrcImagesQuery>(graphql`
		query {
			# // summerschool 2021
			summerschool2021: file(
				relativePath: { eq: "drumworkshops/summerschool-2021.jpg" }
			) {
				childImageSharp {
					gatsbyImageData(layout: FULL_WIDTH)
				}
			}
			midzomerlatest: file(relativePath: { eq: "midzomerlogo-latest.jpeg" }) {
				childImageSharp {
					gatsbyImageData(layout: FULL_WIDTH)
				}
			}

			# // summerschool 2020
			summerschool2020: file(
				relativePath: { eq: "drumworkshops/summerschool-2020.jpg" }
			) {
				childImageSharp {
					gatsbyImageData
				}
			}
			midzomer: file(relativePath: { eq: "midzomerlogo.jpg" }) {
				childImageSharp {
					gatsbyImageData
				}
			}

			# // sankofa
			sankofaB: file(relativePath: { eq: "sankofa-2.jpg" }) {
				childImageSharp {
					gatsbyImageData(width: 1000)
				}
			}
			sankofaF: file(relativePath: { eq: "sankofa-1.jpg" }) {
				childImageSharp {
					gatsbyImageData(width: 1000)
				}
			}
			rotpF: file(relativePath: { eq: "rotp-front.jpeg" }) {
				childImageSharp {
					gatsbyImageData(width: 1000)
				}
			}
			rotpB: file(relativePath: { eq: "rotp-back.jpeg" }) {
				childImageSharp {
					gatsbyImageData(width: 1000)
				}
			}

			# // all partners
			allPartners: allFile(filter: { relativeDirectory: { eq: "partners" } }) {
				nodes {
					relativePath
					childImageSharp {
						gatsbyImageData
					}
				}
			}

			# // kwasi & yaw
			kwasiAndYaw: file(relativePath: { eq: "theater/kwasi-en-yaw.jpg" }) {
				childImageSharp {
					gatsbyImageData
				}
			}

			# // seda
			seda: file(relativePath: { eq: "seda-logo.jpg" }) {
				childImageSharp {
					gatsbyImageData(width: 475)
				}
			}
		}
	`);

	return {
		summerschool2021: data.summerschool2021.childImageSharp.gatsbyImageData,
		midzomerlatest: data.midzomerlatest.childImageSharp.gatsbyImageData,
		summerschool2020: data.summerschool2020.childImageSharp.gatsbyImageData,
		midzomer: data.midzomer.childImageSharp.gatsbyImageData,
		sankofaB: data.sankofaB.childImageSharp.gatsbyImageData,
		sankofaF: data.sankofaF.childImageSharp.gatsbyImageData,
		rotpF: data.rotpF.childImageSharp.gatsbyImageData,
		rotpB: data.rotpB.childImageSharp.gatsbyImageData,
		allPartners: data.allPartners.nodes,
		kwasiAndYaw: data.kwasiAndYaw.childImageSharp.gatsbyImageData,
		seda: data.seda.childImageSharp.gatsbyImageData,
	};
};
