import React, { useEffect, useState } from "react";

import { GatsbyImage } from "gatsby-plugin-image";

import { useSrcImages } from "../../hooks/use-src-image";

import * as styles from "../../styles/modules/components/partners.module.scss";

const Partners: React.FC = () => {
    const { allPartners } = useSrcImages();

    const partnerImages = allPartners;

    const partners = [
        {
            url: "https://www.going-social.nl",
            img: "goingsocial.png",
            name: "Going Social",
        },
        {
            url: "https://untold.nl",
            img: "untold.jpg",
            name: "Theatergezelschap Untold",
        },
        {
            url: "https://www.kalentura.com",
            img: "kalentura.jpeg",
            name: "KalentuRa Drums",
        },
        {
            url: "https://blackharmony.nl",
            img: "blackharmony.png",
            name: "Black Harmony",
        },
        {
            url: "https://www.ebony-steelband-trust.co.uk",
            img: "ebony.png",
            name: "Ebony Steelband (UK)",
        },
        {
            url: "https://acedanceandmusic.com",
            img: "ace.png",
            name: "ACE Dance and Music (UK)",
        },
        {
            url: "https://manhoodacademyofficial.com",
            img: "manhood-academy.jpg",
            name: "Manhood Academy (UK)",
        },
        {
            url: "https://www.vapstudios.com",
            img: "vap-dance-academy-studios.jpg",
            name: "VAP Dance Academy & Studios (South Africa)",
        },
        {
            url: "https://www.instagram.com/ilfbarbados/",
            img: "israel-lovell-foundation.jpg",
            name: "Israel Lovell Foundation (Barbados)",
        },
        {
            url: "https://www.instagram.com/izavybe/",
            img: "izavybe.jpg",
            name: "Izavybe (Barbados)",
        },
    ];

    const shuffleArray = (array: any[]) => {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    const [shuffledPartners, setShuffledPartners] = useState(partners);

    useEffect(() => {
        setShuffledPartners(shuffleArray([...partners]));
    }, []);

    return (
        <section className={styles.partners}>
            <h2 className="page-subtitle">Partners</h2>
            <ul>
                {shuffledPartners.map((partner, index) => {
                    const partnerImage = partnerImages.find(
                        (image: { relativePath: string }) =>
                            image.relativePath === `partners/${partner.img}`
                    );
                    const image =
                        partnerImage?.childImageSharp?.gatsbyImageData;

                    if (!image) {
                        return null;
                    }

                    return (
                        <li key={index}>
                            <a
                                href={partner.url}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <GatsbyImage
                                    image={image}
                                    alt={partner.name}
                                    className={styles.partnersLogo}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Partners;
