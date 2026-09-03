import * as React from "react";

import type { HeadProps } from "gatsby";

import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import Breadcrumbs from "../components/layout/breadcrumbs";

import { Seo } from "../components/seo";

interface VacancyProps {
    pageContext: {
        jobTitle: string;
        fullJobTitle: string;
        department: {
            raw: string;
        };
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
        benefits: {
            raw: string;
        };
        details: {
            raw: string;
        };
        apply: {
            raw: string;
        };
    };
}

const Vacancy = ({
    pageContext: {
        jobTitle,
        fullJobTitle,
        jobImage,
        department,
        jobDescription,
        organisationDetails,
        requirements,
        responsibilities,
        benefits,
        details,
        apply,
    },
}: VacancyProps) => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Over Ons", link: "/over-ons/" },
        { label: "Vacatures", link: "/over-ons/vacatures/" },
        { label: jobTitle },
    ];

    const renderOptions = {
        renderText: (text: string) =>
            text.split("\n").reduce((children: React.ReactNode[], textSegment, index) => {
                if (index > 0) {
                    children.push(<br key={`line-break-${children.length}`} />);
                }

                children.push(textSegment);
                return children;
            }, []),
    };

    const image = jobImage?.gatsbyImageData ? getImage(jobImage.gatsbyImageData) : null;

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Vacature: {jobTitle}</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content image-right">
                    <div>
                        <h2>betreft vacature:</h2>
                        <h3>{fullJobTitle}</h3>
                        {renderRichText(organisationDetails, renderOptions)}

                        {renderRichText(jobDescription, renderOptions)}

                        {renderRichText(responsibilities, renderOptions)}

                        {renderRichText(requirements, renderOptions)}

                        {renderRichText(benefits, renderOptions)}

                        {renderRichText(details, renderOptions)}

                        {renderRichText(apply, renderOptions)}

                        {renderRichText(department, renderOptions)}
                    </div>
                    <div>
                        <div>
                            <GatsbyImage image={image!} alt={jobImage.description} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Vacancy;

interface SeoContext {
    jobTitle: string;
}

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
    const pageTitle = (pageContext as SeoContext)?.jobTitle || "";
    return <Seo title={pageTitle} />;
};
