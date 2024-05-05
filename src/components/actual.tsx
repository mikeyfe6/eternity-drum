import React, { useState, useRef, MouseEvent, useEffect } from 'react';

import { graphql, useStaticQuery, Link } from 'gatsby';

import YouTubePlayer from './youtubePlayer';

import LightBox from './lightbox';

import * as styles from '../styles/modules/actual.module.scss';

const Actualiteiten: React.FC = () => {
	const [activeButton, setActiveButton] = useState<number>(0);
	const openContentRef = useRef<HTMLDivElement | null>(null);

	const { sankofaB, sankofaF, rotpF, rotpB, wijkImpOne, wijkImpTwo } =
		useStaticQuery(graphql`
			query {
				sankofaB: file(relativePath: { eq: "sankofa-2.jpg" }) {
					childImageSharp {
						gatsbyImageData
					}
				}
				sankofaF: file(relativePath: { eq: "sankofa-1.jpg" }) {
					childImageSharp {
						gatsbyImageData
					}
				}
				rotpF: file(relativePath: { eq: "rotp-front.jpeg" }) {
					childImageSharp {
						gatsbyImageData
					}
				}
				rotpB: file(relativePath: { eq: "rotp-back.jpeg" }) {
					childImageSharp {
						gatsbyImageData
					}
				}
				wijkImpOne: file(relativePath: { eq: "wijkimpuls-190424.jpg" }) {
					childImageSharp {
						gatsbyImageData
					}
				}
				wijkImpTwo: file(relativePath: { eq: "wijkimpuls-260424.jpg" }) {
					childImageSharp {
						gatsbyImageData
					}
				}
			}
		`);

	const sankofaBack = sankofaB.childImageSharp.gatsbyImageData;
	const sankofaFront = sankofaF.childImageSharp.gatsbyImageData;

	const rotpFront = rotpF.childImageSharp.gatsbyImageData;
	const rotpBack = rotpB.childImageSharp.gatsbyImageData;

	const wijkImpulsOne = wijkImpOne.childImageSharp.gatsbyImageData;
	const wijkImpulsTwo = wijkImpTwo.childImageSharp.gatsbyImageData;

	const updateHeight = () => {
		const element = openContentRef.current;
		if (element) {
			const height = element.clientHeight;
			const collapsibleDivs = document.querySelectorAll(
				`.${styles.collapsible}`
			);
			collapsibleDivs.forEach((collapsibleDiv) => {
				const div = collapsibleDiv as HTMLElement;
				div.style.marginBottom = `${height}px`;
			});
		}
	};

	useEffect(() => {
		updateHeight();

		const resizeListener = () => {
			updateHeight();
		};

		const observer = new MutationObserver(resizeListener);
		observer.observe(document.body, { subtree: true, childList: true });

		window.addEventListener('resize', resizeListener);
		window.addEventListener('DOMContentLoaded', resizeListener);
		window.addEventListener('load', resizeListener);
		document.addEventListener('readystatechange', resizeListener);

		return () => {
			window.removeEventListener('resize', resizeListener);
			window.removeEventListener('DOMContentLoaded', resizeListener);
			window.removeEventListener('load', resizeListener);
			document.removeEventListener('readystatechange', resizeListener);
		};
	}, []);

	const toggleCollapsible = (index: number) => {
		setActiveButton((prevIndex) => (prevIndex === index ? prevIndex : index));
	};

	const buttons = [
		<>
			<span>Masterclass</span>
			<p>Wijkimpuls - 26/04/24</p>
		</>,
		<>
			<span>Presentatie</span>
			<p>Wijkimpuls - 19/04/24</p>
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
			<span>Vacature</span>
			<p>Meewerkend Coördinator Productie</p>
		</>,
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

	const contents: (JSX.Element | string)[] = [
		/* 1 */
		<div key={`content-1`}>
			<div className={styles.collapsibleImages}>
				<LightBox image={wijkImpulsTwo} alt='Wijkimpuls - 26/04/24' />
			</div>
		</div>,
		/* 2 */
		<div key={`content-0`}>
			<div className={styles.collapsibleImages}>
				<LightBox image={wijkImpulsOne} alt='Wijkimpuls - 19/04/24' />
			</div>
		</div>,
		/* 3 */
		<YouTubePlayer key={`content-2`} videoId='5lMEV6HLFQQ' />,
		/* 4 */
		<div key={`content-3`}>
			<p>
				Sankofa Academy is een educatief programma in het kader van een gedeelte
				geschiedenis om mensen van Afrikaanse afkomst te leren over hun eigen
				geschiedenis om mensen van Afrikaanse afkomst te leren over hun eigen
				geschiedenis en de maatschappelijke gevolgen hiervan.
			</p>
			<div className={styles.collapsibleImages}>
				<LightBox image={sankofaBack} alt='Sankofa Flyer Achterkant' />
				<LightBox image={sankofaFront} alt='Sankofa Flyer Voorkant' />
			</div>
			<Link to='/projecten/sankofa-academy/'>Lees meer</Link>
		</div>,
		/* 5 */
		<div key={`content-4`}>
			<p>
				Percussionband Eternity, Untold Empowerment & Black Harmony geven dit
				jaar na groot succes OPNIEUW gratis workshops!
			</p>
			<Link to='/drumworkshops/summerschool-2021/'>Lees meer</Link>
		</div>,
		/* 6 */
		<div key={`content-5`}>
			<p>
				We zijn voor de organisaties Untold en Eternity op zoek naar een
				coördinator productie die graag de handen uit de mouwen steekt!
			</p>
			<Link to='/over-ons/vacatures/meewerkend-coordinator-productie/'>
				Ga naar vacature
			</Link>
		</div>,
		/* 7 */
		<div key={`content-6`}>
			<p>"Building Strong Communities: op zoek naar het verleden."</p>
			<span> Bron: Salto PI</span>
			<a
				href='https://participationpool.eu/project/discover-black-history-building-strong-communities/'
				rel='noopener noreferrer'
				target='_blank'>
				Lees het artikel
			</a>
		</div>,
		/* 8 */
		<div key={`content-7`}>
			<p>"Drum Academy: eindelijk kunnen drumbands weer decibellen maken."</p>
			<span> Bron: Parool, door Patrick Meershoek</span>
			<a
				href='https://www.parool.nl/ps/drum-academy-eindelijk-kunnen-drumbands-weer-decibellen-maken~b48470e0b/'
				rel='noopener noreferrer'
				target='_blank'>
				Lees het artikel
			</a>
		</div>,
		/* 9 */
		<div key={`content-8`}>
			<p>
				Percussionband Eternity, Untold Empowerment & Black Harmony geven gratis
				workshops!
			</p>
			<Link to='/drumworkshops/summerschool-2020/'>Lees meer</Link>
		</div>,
		/* 10 */
		<div key={`content-9`}>
			<div className={styles.collapsibleImages}>
				<LightBox
					image={rotpFront}
					alt='Rite Of The Passage Artikel (voorkant)'
				/>
				<LightBox
					image={rotpBack}
					alt='Rite Of The Passage Artikel (achterkant)'
				/>
			</div>
		</div>,
	];

	return (
		<section>
			<h2 style={{ textAlign: 'center' }}>Actualiteiten</h2>
			<div className={styles.collapsible}>
				{buttons.map((button, index) => {
					const isButtonActive = activeButton === index;
					const contentRef = isButtonActive ? openContentRef : null;

					return (
						<div
							key={`button-${index}`}
							className={styles.collapsibleContainer}>
							<div className={styles.collapsibleBtns}>
								<button
									onClick={(e: MouseEvent<HTMLButtonElement>) =>
										toggleCollapsible(index)
									}
									className={isButtonActive ? styles.activeButton : ''}
									style={{ cursor: 'pointer' }}>
									{button}
								</button>
							</div>
							<div
								className={`${styles.content} ${
									isButtonActive ? styles.open : ''
								}`}
								ref={(el) => {
									if (contentRef && el) {
										contentRef.current = el;
									}
								}}>
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
