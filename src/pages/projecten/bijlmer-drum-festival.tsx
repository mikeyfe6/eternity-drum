import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import { Seo } from "../../components/seo";

const BijlmerDrumFestival: React.FC<PageProps> = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Projecten", link: "/projecten/" },
        { label: "Bijlmer Drum Festival" },
    ];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Bijlmer Drum Festival</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content list">
                    <h2>Verwante artikelen:</h2>
                    <ul>
                        <li>
                            <a
                                href="https://www.zuidoostenmeer.nl/nieuws/algemeen/16258/bijlmer-drum-festival-2025-viering-van-ritme-en-cultuur-in-am"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <em>
                                    Bijlmer Drum Festival 2025: Viering van
                                    Ritme en cultuur in Amsterdam Zuidoost
                                    <FontAwesomeIcon
                                        icon={"up-right-from-square"}
                                    />
                                </em>
                                <span>- ZUIDOOST&Meer</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.at5.nl/nieuws/229721/bijlmer-drum-festival-amsterdam-zuidoost"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <em>
                                    Organisator Bijlmer Drum Festival: "We laten
                                    de diversiteit van Amsterdam zien met
                                    muziek"
                                    <FontAwesomeIcon
                                        icon={"up-right-from-square"}
                                    />
                                </em>
                                <span>- AT5</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.funx.nl/fragmenten/the-block-amsterdam/9da4dd81-39ee-4d8c-9b36-471af63efe92/2024-12-04-tijdens-het-bijlmer-drum-festival-maak-je-kennis-met-alle-stijlen-drums"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <em>
                                    Tijdens het Bijlmer Drum Festival maak je
                                    kennis met alle stijlen drums
                                    <FontAwesomeIcon
                                        icon={"up-right-from-square"}
                                    />
                                </em>
                                <span>- FunX</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.events.nl/nieuws/licht-amsterdam"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <em>
                                    Licht in Amsterdam
                                    <FontAwesomeIcon
                                        icon={"up-right-from-square"}
                                    />
                                </em>
                                <span>- Events.nl</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default BijlmerDrumFestival;

export const Head: HeadFC = () => (
    <Seo
        title="Bijlmer Drum Festival"
        pathname="/projecten/bijlmer-drum-festival/"
    />
);
