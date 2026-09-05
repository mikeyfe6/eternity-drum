import * as React from "react";

import { Link, type HeadFC, type PageProps } from "gatsby";

import Breadcrumbs from "../components/layout/breadcrumbs";

import { Seo } from "../components/seo";

const Theater: React.FC<PageProps> = () => {
    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Theater" }];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Theater</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content center">
                    <h2>Theater & Podiumkunst</h2>
                    <p>
                        <strong>Eternity Percussion</strong> ontwikkelt en produceert professionele muziek- en
                        theatervoorstellingen waarin percussie, muziek, dans en spel samenkomen. Vanuit onze
                        Afro-Caribische roots brengen we verhalen naar het podium over identiteit, cultureel erfgoed,
                        geschiedenis, persoonlijke ontwikkeling en de verbinding tussen generaties.
                    </p>
                    <p>
                        In onze producties werken we samen met professionele makers, musici, acteurs, dansers en andere
                        kunstenaars. Afro-Caribische en Afrikaanse muziek- en percussietradities vormen een belangrijke
                        artistieke inspiratiebron en worden verbonden met hedendaagse vormen van theater, muziek en
                        performance.
                    </p>
                    <p>
                        Met eigen producties als <Link to="/theater/umuntu/">Umuntu</Link>,{" "}
                        <Link to="/theater/muziki/">Muziki</Link> en <Link to="/theater/kwasi-yaw/">Kwasi & Yaw</Link>{" "}
                        heeft Eternity de afgelopen jaren een herkenbare artistieke praktijk binnen de podiumkunsten
                        ontwikkeld.
                    </p>
                    <h3>Coproducties & artistieke samenwerking</h3>
                    <p>
                        Eternity werkt daarnaast samen met andere makers en culturele organisaties aan professionele
                        podiumproducties. Zo realiseerden Black Harmony, Untold en Eternity Percussion gezamenlijk het
                        theaterconcert Nyan Faro (2025), waarin Afro-Surinaamse Winti-cultuur, muziek, dans en
                        spiritualiteit samenkomen.
                    </p>
                    <p>
                        Ook dragen musici van Eternity bij aan producties van samenwerkingspartners. Zo zijn muzikanten
                        van Eternity betrokken bij het jubileumconcert A Poku Tori fu Black Harmony, waarin zang,
                        percussie, beweging en Afro-Surinaams cultureel erfgoed centraal staan.
                    </p>
                    <p>
                        Eternity blijft investeren in nieuwe producties, coproducties en artistieke samenwerkingen met
                        makers en culturele partners in Nederland en daarbuiten.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Theater;

export const Head: HeadFC = () => <Seo title="Theater" pathname="/theater/" />;
