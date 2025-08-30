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
        /* 1 */
        <>
            <span>Artikel</span>
            <p>Notting Hill Carnival 2025</p>
        </>,
        /* 2 */
        <>
            <span>Media</span>
            <p>Sankofa Academy</p>
        </>,
        /* 3 */
        <>
            <span>Workshops</span>
            <p>Sankofa Academy</p>
        </>,
        /* 4 */
        <>
            <span>Workshops</span>
            <p>Eternity Summerschool 2021</p>
        </>,
        /* 5 */
        <>
            <span>Artikel</span>
            <p>Building Strong Communities</p>
        </>,
        /* 6 */
        <>
            <span>Artikel</span>
            <p>Drum Academy</p>
        </>,
        /* 7 */
        <>
            <span>Workshops</span>
            <p>Eternity Summerschool 2020</p>
        </>,
        /* 8 */
        <>
            <span>Artikel</span>
            <p>Rite Of Passage</p>
        </>,
    ];

    const contents: (React.ReactNode | string)[] = [
        /* 1 */
        <div key={`content-1`}>
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
            <span>- Bron: BBC, door Harry Low</span>
            <a
                href="https://www.bbc.com/news/live/c3dpz3755d3t?post=asset%3A338cddae-6618-4298-b40f-6cec1513e2e7#post"
                rel="noopener noreferrer"
                target="_blank"
            >
                Lees het artikel
            </a>
        </div>,
        /* 2 */
        <YouTubePlayer key={`content-2`} videoId="5lMEV6HLFQQ" />,
        /* 3 */
        <div key={`content-3`}>
            <p>
                Sankofa Academy is een educatief programma in het kader van een
                gedeelte geschiedenis om mensen van Afrikaanse afkomst te leren
                over hun eigen geschiedenis om mensen van Afrikaanse afkomst te
                leren over hun eigen geschiedenis en de maatschappelijke
                gevolgen hiervan.
            </p>
            <div className={styles.collapsibleImages}>
                {sankofaBack && (
                    <LightBox
                        image={sankofaBack}
                        alt="Sankofa Flyer Achterkant"
                    />
                )}
                {sankofaFront && (
                    <LightBox
                        image={sankofaFront}
                        alt="Sankofa Flyer Voorkant"
                    />
                )}
            </div>
            <Link to="/projecten/sankofa-academy/">Leer meer</Link>
        </div>,
        /* 4 */
        <div key={`content-4`}>
            <p>
                Percussionband Eternity, Untold Empowerment & Black Harmony
                geven dit jaar na groot succes OPNIEUW gratis workshops!
            </p>
            <Link to="/drumworkshops/summerschool-2021/">Leer meer</Link>
        </div>,
        /* 5 */
        <div key={`content-5`}>
            <p>"Building Strong Communities: op zoek naar het verleden."</p>
            <span>- Bron: Salto PI, door Lilla Gősi</span>
            <a
                href="https://participationpool.eu/project/discover-black-history-building-strong-communities/"
                rel="noopener noreferrer"
                target="_blank"
            >
                Lees het artikel
            </a>
        </div>,
        /* 6 */
        <div key={`content-6`}>
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
        /* 7 */
        <div key={`content-7`}>
            <p>
                Percussionband Eternity, Untold Empowerment & Black Harmony
                geven gratis workshops!
            </p>
            <Link to="/drumworkshops/summerschool-2020/">Lees meer</Link>
        </div>,
        /* 8 */
        <div key={`content-8`}>
            <div className={styles.collapsibleImages}>
                {rotpFront && (
                    <LightBox
                        image={rotpFront}
                        alt="Rite Of The Passage Artikel (voorkant)"
                    />
                )}
                {rotpBack && (
                    <LightBox
                        image={rotpBack}
                        alt="Rite Of The Passage Artikel (achterkant)"
                    />
                )}
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
