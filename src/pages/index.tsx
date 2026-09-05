import * as React from "react";

import { HeadFC, PageProps, Link } from "gatsby";

import { useSiteMetadata } from "../hooks/use-site-metadata";

import Hero from "../components/layout/heroslider";
import WhiteSpace from "../components/layout/whitespace";

import CtaButtons from "../components/ui/cta";
import Collapsible from "../components/ui/actual";
import Berichten from "../components/ui/posts";
import Courses from "../components/ui/courses";
import Partners from "../components/ui/partners";

import { Seo } from "../components/seo";

import * as styles from "../styles/modules/pages/index.module.scss";

const Index: React.FC<PageProps> = () => {
    const { companyName } = useSiteMetadata();

    return (
        <>
            <Hero />
            <section className="page-intro home-intro">
                <h1 className="page-title">{companyName}</h1>
                <CtaButtons />
            </section>

            <section className={styles.homepage} data-main-section>
                <p>
                    Eternity Percussion is een professioneel producerende culturele organisatie in Amsterdam Zuidoost.
                    Vanuit onze Afro-Caribische roots ontwikkelen, produceren en presenteren we muziek- en
                    podiumkunstprojecten waarin artistieke kwaliteit, talentontwikkeling, cultureel erfgoed en
                    maatschappelijke impact samenkomen.
                </p>
                <p>
                    Vanuit <Link to="/seda/">Southeast Drum Academy (SEDA)</Link> creëren we ruimte voor makers, musici
                    en jong talent om zich artistiek te ontwikkelen. We realiseren professionele producties,
                    talentprogramma’s, festivals, cultuureducatie en internationale samenwerkingen en brengen
                    Afro-Caribische muziek- en percussietradities naar podia in Nederland en daarbuiten.
                </p>
            </section>

            <Collapsible />

            <WhiteSpace />

            <Berichten />

            <WhiteSpace />

            <Courses />

            <Partners />
        </>
    );
};

export default Index;

export const Head: HeadFC = () => <Seo />;
