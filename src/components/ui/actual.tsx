import React, { useState } from "react";
import { Link } from "gatsby";

import { useSrcImages } from "../../hooks/use-src-image";

import YouTubePlayer from "./youtubePlayer";

import LightBox from "../plugins/lightbox";

import * as styles from "../../styles/modules/components/actual.module.scss";

const Actualiteiten: React.FC = () => {
    const { sankofaB, sankofaF, rotpF, rotpB } = useSrcImages();
    const [activeButton, setActiveButton] = useState<number>(0);

    const toggleCollapsible = (index: number) => {
        setActiveButton((prevIndex) => (prevIndex === index ? prevIndex : index));
    };

    const buttons = [
        <>
            <span>Vacature</span>
            <p>Docent Percussie & Talentontwikkeling</p>
        </>,
        <>
            <span>Vacature</span>
            <p>Projectleider Jeugd & Talentontwikkeling</p>
        </>,
        <>
            <span>Artikel</span>
            <p>Notting Hill Carnival 2025</p>
        </>,
        <>
            <span>Media</span>
            <p>Sankofa Academy</p>
        </>,
        <>
            <span>Workshops</span>
            <p>Sankofa Academy</p>
        </>,
        <>
            <span>Workshops</span>
            <p>Eternity Summerschool 2021</p>
        </>,
        <>
            <span>Artikel</span>
            <p>Building Strong Communities</p>
        </>,
        <>
            <span>Artikel</span>
            <p>Drum Academy</p>
        </>,
        <>
            <span>Workshops</span>
            <p>Eternity Summerschool 2020</p>
        </>,
        <>
            <span>Artikel</span>
            <p>Rite Of Passage</p>
        </>,
    ];

    const buttonKeys = [
        "docent-percussie-talentontwikkeling",
        "projectleider-jeugd-talentontwikkeling",
        "notting-hill-carnival",
        "sankofa-media",
        "sankofa-workshops",
        "summerschool-2021",
        "building-strong-communities",
        "drum-academy",
        "summerschool-2020",
        "rite-of-passage",
    ];

    const renderContent = (index: number) => {
        if (activeButton !== index) return null;

        switch (index) {
            case 0:
                return (
                    <div>
                        <h3>Vacature: Docent Percussie & Talentontwikkeling</h3>
                        <p>
                            Maak muziek die jonge mensen in beweging brengt. Geef percussielessen, bouw mee aan talent
                            en zie deelnemers groeien in ritme, zelfvertrouwen en performance.
                        </p>
                        <Link to="/over-ons/vacatures/docent-percussie-en-talentontwikkeling/">Zie vacature</Link>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h3>Vacature: Projectleider Jeugd & Talentontwikkeling</h3>
                        <p>
                            Wil jij bijdragen aan de talenten van morgen? Coördineer inspirerende projecten voor
                            kinderen en jongeren en verbind deelnemers, docenten en partners binnen SEDA.
                        </p>
                        <Link to="/over-ons/vacatures/projectleider-jeugd-en-talentontwikkeling/">Zie vacature</Link>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <img
                            src="https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/8/25/e5012a3c-c294-4476-a55a-0de97a8ce6a4.jpg.webp"
                            alt="BBC Thumbnail"
                        />
                        <br />
                        <br />
                        <p>
                            Eternity Percussion &{" "}
                            <a
                                href="https://www.originals-entertainment.com/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                The Originals Entertainment
                            </a>{" "}
                            tijdens het <b>Notting Hill Carnival 2025!</b>
                        </p>
                        <span>- Bron: BBC News, door Harry Low</span>
                        <a
                            href="https://www.bbc.com/news/live/c3dpz3755d3t?post=asset%3A338cddae-6618-4298-b40f-6cec1513e2e7#post"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Lees het artikel
                        </a>
                    </div>
                );
            case 3:
                return <YouTubePlayer videoId="5lMEV6HLFQQ" />;
            case 4:
                return (
                    <div>
                        <p>
                            Sankofa Academy is een educatief programma in het kader van een gedeelte geschiedenis om
                            mensen van Afrikaanse afkomst te leren over hun eigen geschiedenis en de maatschappelijke
                            gevolgen hiervan.
                        </p>
                        <div className={styles.collapsibleImages}>
                            {sankofaB && <LightBox image={sankofaB} alt="Sankofa Flyer Achterkant" />}
                            {sankofaF && <LightBox image={sankofaF} alt="Sankofa Flyer Voorkant" />}
                        </div>
                        <Link to="/projecten/sankofa-academy/">Leer meer</Link>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p>
                            Percussionband Eternity, Untold Empowerment & Black Harmony geven dit jaar na groot succes
                            OPNIEUW gratis workshops!
                        </p>
                        <Link to="/drumworkshops/summerschool-2021/">Leer meer</Link>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <p>"Building Strong Communities: op zoek naar het verleden."</p>
                        <span>- Bron: Salto PI, door Lilla Gősi</span>
                        <a
                            href="https://participationpool.eu/project/discover-black-history-building-strong-communities/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Lees het artikel
                        </a>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <p>"Drum Academy: eindelijk kunnen drumbands weer decibellen maken."</p>
                        <span>- Bron: Parool, door Patrick Meershoek</span>
                        <a
                            href="https://www.parool.nl/ps/drum-academy-eindelijk-kunnen-drumbands-weer-decibellen-maken~b48470e0b/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Lees het artikel
                        </a>
                    </div>
                );
            case 8:
                return (
                    <div>
                        <p>Percussionband Eternity, Untold Empowerment & Black Harmony geven gratis workshops!</p>
                        <Link to="/drumworkshops/summerschool-2020/">Lees meer</Link>
                    </div>
                );
            case 9:
                return (
                    <div className={styles.collapsibleImages}>
                        {rotpF && <LightBox image={rotpF} alt="Rite Of The Passage Artikel (voorkant)" />}
                        {rotpB && <LightBox image={rotpB} alt="Rite Of The Passage Artikel (achterkant)" />}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className={styles.actual}>
            <h2 className="page-subtitle">Actualiteiten</h2>
            <div className={styles.collapsible}>
                <div className={styles.collapsibleControls}>
                    {buttons.map((button, index) => (
                        <div key={buttonKeys[index]} className={styles.collapsibleContainer}>
                            <div className={styles.collapsibleButton}>
                                <button
                                    onClick={() => toggleCollapsible(index)}
                                    className={activeButton === index ? styles.activeButton : ""}
                                >
                                    {button}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.collapsibleContent}>
                    <div className={`${styles.collapsibleItem} ${styles.open}`}>{renderContent(activeButton)}</div>
                </div>
            </div>
        </section>
    );
};

export default Actualiteiten;
