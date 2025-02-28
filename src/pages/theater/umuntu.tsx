import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import { Seo } from "../../components/seo";

const Umuntu: React.FC<PageProps> = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Theater", link: "/theater/" },
        { label: "Umuntu" },
    ];

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Umuntu</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content coming-soon">
                    <p>Pagina komt binnenkort..</p>
                </div>
            </section>
        </>
    );
};

export default Umuntu;

export const Head: HeadFC = () => (
    <Seo title="Umuntu" pathname="/theater/umuntu/" />
);
