import React, { useState, useRef, useEffect } from "react";

import { Link } from "gatsby";

import { useSrcImages } from "../../hooks/use-src-image";

import YouTubePlayer from "./youtubePlayer";

import LightBox from "../plugins/lightbox";

import * as styles from "../../styles/modules/components/actual.module.scss";

const Actualiteiten: React.FC = () => {
    const { sankofaB, sankofaF, rotpF, rotpB } = useSrcImages();

    const [activeButton, setActiveButton] = useState<number>(0);
    const openContentRef = useRef<HTMLDivElement | null>(null);

    const sankofaBack = sankofaB;
    const sankofaFront = sankofaF;

    const rotpFront = rotpF;
    const rotpBack = rotpB;

    // const wijkImpulsOne = wijkImpOne.childImageSharp.gatsbyImageData;
    // const wijkImpulsTwo = wijkImpTwo.childImageSharp.gatsbyImageData;

    const setCollapsibleMarginBottom = () => {
        const element = openContentRef.current;
        if (element) {
            const height = element.clientHeight;
            const collapsibleContainers = document.querySelectorAll(
                `.${styles.collapsible}`
            );

            collapsibleContainers.forEach((container) => {
                const containerDiv = container as HTMLElement;
                containerDiv.style.marginBottom = `${height}px`;
            });
        }
    };

    useEffect(() => {
        setCollapsibleMarginBottom();

        const handleResize = () => {
            setCollapsibleMarginBottom();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleCollapsible = (index: number) => {
        setActiveButton((prevIndex) =>
            prevIndex === index ? prevIndex : index
        );

        setTimeout(() => {
            setCollapsibleMarginBottom();
        }, 100);
    };

    const buttons = [
        // <>
        // 	<span>Masterclass</span>
        // 	<p>Wijkimpuls - 26/04/24</p>
        // </>,
        // <>
        // 	<span>Presentatie</span>
        // 	<p>Wijkimpuls - 19/04/24</p>
        // </>,
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
        // <>
        // 	<span>Vacature</span>
        // 	<p>Meewerkend Coördinator Productie</p>
        // </>,
        <>
            <span>Nieuws</span>
            <p>Building Strong Communities</p>
        </>,
        <>
            <span>Nieuws</span>
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

    const contents: (React.ReactNode | string)[] = [
        // /* 1 */
        // <div key={`content-1`}>
        // 	<div className={styles.collapsibleImages}>
        // 		<LightBox image={wijkImpulsTwo} alt='Wijkimpuls - 26/04/24' />
        // 	</div>
        // </div>,
        // /* 2 */
        // <div key={`content-0`}>
        // 	<div className={styles.collapsibleImages}>
        // 		<LightBox image={wijkImpulsOne} alt='Wijkimpuls - 19/04/24' />
        // 	</div>
        // </div>,
        /* 3 */
        <YouTubePlayer key={`content-2`} videoId="5lMEV6HLFQQ" />,
        /* 4 */
        <div key={`content-3`}>
            <p>
                Sankofa Academy is een educatief programma in het kader van een
                gedeelte geschiedenis om mensen van Afrikaanse afkomst te leren
                over hun eigen geschiedenis om mensen van Afrikaanse afkomst te
                leren over hun eigen geschiedenis en de maatschappelijke
                gevolgen hiervan.
            </p>
            <div className={styles.collapsibleImages}>
                <LightBox image={sankofaBack} alt="Sankofa Flyer Achterkant" />
                <LightBox image={sankofaFront} alt="Sankofa Flyer Voorkant" />
            </div>
            <Link to="/projecten/sankofa-academy/">Lees meer</Link>
        </div>,
        /* 5 */
        <div key={`content-4`}>
            <p>
                Percussionband Eternity, Untold Empowerment & Black Harmony
                geven dit jaar na groot succes OPNIEUW gratis workshops!
            </p>
            <Link to="/drumworkshops/summerschool-2021/">Lees meer</Link>
        </div>,
        /* 6 */
        // <div key={`content-5`}>
        // 	<p>
        // 		We zijn voor de organisaties Untold en Eternity op zoek naar een
        // 		coördinator productie die graag de handen uit de mouwen steekt!
        // 	</p>
        // 	<Link to="/over-ons/vacatures/meewerkend-coordinator-productie/">
        // 		Ga naar vacature
        // 	</Link>
        // </div>,
        /* 7 */
        <div key={`content-6`}>
            <p>"Building Strong Communities: op zoek naar het verleden."</p>
            <span>- Bron: Salto PI</span>
            <a
                href="https://participationpool.eu/project/discover-black-history-building-strong-communities/"
                rel="noopener noreferrer"
                target="_blank"
            >
                Lees het artikel
            </a>
        </div>,
        /* 8 */
        <div key={`content-7`}>
            <p>
                "Drum Academy: eindelijk kunnen drumbands weer decibellen
                maken."
            </p>
            <span>- Bron: Parool, door Patrick Meershoek</span>
            <a
                href="https://www.parool.nl/ps/drum-academy-eindelijk-kunnen-drumbands-weer-decibellen-maken~b48470e0b/"
                rel="noopener noreferrer"
                target="_blank"
            >
                Lees het artikel
            </a>
        </div>,
        /* 9 */
        <div key={`content-8`}>
            <p>
                Percussionband Eternity, Untold Empowerment & Black Harmony
                geven gratis workshops!
            </p>
            <Link to="/drumworkshops/summerschool-2020/">Lees meer</Link>
        </div>,
        /* 10 */
        <div key={`content-9`}>
            <div className={styles.collapsibleImages}>
                <LightBox
                    image={rotpFront}
                    alt="Rite Of The Passage Artikel (voorkant)"
                />
                <LightBox
                    image={rotpBack}
                    alt="Rite Of The Passage Artikel (achterkant)"
                />
            </div>
        </div>,
    ];

    return (
        <section className={styles.actual}>
            <h2 className="page-subtitle">Actualiteiten</h2>
            <div className={styles.collapsible}>
                {buttons.map((button, index) => {
                    const isButtonActive = activeButton === index;
                    const contentRef = isButtonActive ? openContentRef : null;

                    return (
                        <div
                            key={`button-${index}`}
                            className={styles.collapsibleContainer}
                        >
                            <div className={styles.collapsibleButton}>
                                <button
                                    onClick={() => toggleCollapsible(index)}
                                    className={
                                        isButtonActive
                                            ? styles.activeButton
                                            : ""
                                    }
                                >
                                    {button}
                                </button>
                            </div>
                            <div
                                className={`${styles.collapsibleItem} ${
                                    isButtonActive ? styles.open : ""
                                }`}
                                ref={(el) => {
                                    if (contentRef && el) {
                                        contentRef.current = el;
                                    }
                                }}
                            >
                                {contents[index]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Actualiteiten;
