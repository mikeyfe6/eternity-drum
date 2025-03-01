import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import { Seo } from "../../components/seo";

const Muziki: React.FC<PageProps> = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Theater", link: "/theater/" },
        { label: "Muziki" },
    ];

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Muziki</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content basic big-image">
                    <div>
                        <h2>Theatervoorstelling: "MUZIKI"</h2>
                        <p>
                            In de muziekvoorstelling ‘<strong>Muziki</strong>’
                            laten de muzikanten van Eternity Percussion de
                            evolutie zien van traditionele Afrikaanse percussie
                            tot aan de hedendaagse Afro-Caribische marchingdrum.
                            De reis start in West-Afrika, via Noord en
                            Zuid-Amerika, het Caribische gebied en eindigend in
                            Nederland waar de Caribische marching percussie nu
                            populair is.
                        </p>
                        <p>
                            <h3 className="as-h4">Credits</h3>
                            <ul>
                                <li>
                                    <b>Makers:</b> Derillio Alexander en
                                    Revelino Pinas
                                </li>
                                <li>
                                    <b>Cast:</b> Derillio Alexander, Revelino
                                    Pinas, Ulrich Entingh, Derek Simpey, Michael
                                    Fransman en Jamal Bijnoe.
                                </li>
                                <li>
                                    <b>Decorontwerper:</b> Michael Deekman
                                </li>
                                <li>
                                    <b>Coach muzikaal arrangeur:</b> Orlando
                                    Ceder
                                </li>
                                <li>
                                    <b>Regie:</b> Tati Wirahadiraksa
                                </li>
                            </ul>
                        </p>
                    </div>
                    <div>
                        <StaticImage
                            src="../../images/theater/muziki.jpg"
                            alt={`Muziki`}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Muziki;

export const Head: HeadFC = () => (
    <Seo title="Muziki" pathname="/theater/muziki/" />
);
