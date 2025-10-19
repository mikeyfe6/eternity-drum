import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import { Seo } from "../../components/seo";

const SankofaSchool: React.FC<PageProps> = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Projecten", link: "/projecten/" },
        { label: "Sankofa School" },
    ];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Sankofa School</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content coming-soon">
                    <p>Pagina komt binnenkort..</p>
                </div>
            </section>
        </>
    );
};

export default SankofaSchool;

export const Head: HeadFC = () => (
    <Seo title="Sankofa School" pathname="/projecten/sankofa-school/" />
);
