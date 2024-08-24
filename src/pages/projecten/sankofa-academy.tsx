import React, { useRef } from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import type { HeadFC, PageProps } from 'gatsby';

import { useSiteMetadata } from '../../hooks/use-site-metadata';

import { Seo } from '../../components/seo';

import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';
import RegisterForm, { handleClick } from '../../components/registerForm';

import LightBox from '../../components/lightbox';

import * as styles from '../../styles/modules/workshop.module.scss';

const SankofaAcademy: React.FC<PageProps> = () => {
	const { email, mobileRaw } = useSiteMetadata();

	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Projecten', link: '/projecten/' },
		{ label: 'Sankofa Academy' },
	];

	const { sankofaB, sankofaF } = useStaticQuery(graphql`
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
		}
	`);

	const inputRef = useRef<HTMLInputElement>(null);

	const sankofaBack = sankofaB.childImageSharp.gatsbyImageData;
	const sankofaFront = sankofaF.childImageSharp.gatsbyImageData;

	return (
		<>
			<Hero />
			<section data-main-section>
				<div className={styles.workshopBgImage} />
				<Breadcrumb crumbs={breadcrumbs} />
				<h1>Sankofa Academy</h1>

				<div className={styles.workshopContainer}>
					<RegisterForm inputRef={inputRef} />
					<section data-main-content className={styles.workshopInfo}>
						<p>
							<strong>Sankofa Academy</strong> is een educatief programma in het
							kader van een gedeelde geschiedenis om mensen van Afrikaanse
							afkomst te leren over hun eigen geschiedenis en de
							maatschappelijke gevolgen hiervan. Middels het organiseren van
							ontmoetingsactiviteiten is Eternity Percussion bezig met het
							bijdragen aan het empoweren en emanciperen van
							Afrikaanse-Nederlandse groepen door middels van verschillende
							educatieve activiteiten.
						</p>

						<hr />
						<div className={styles.workshopImages}>
							<LightBox image={sankofaBack} alt='Sankofa Flyer Achterkant' />
							<LightBox image={sankofaFront} alt='Sankofa Flyer Voorkant' />
						</div>
						<hr />

						<p>
							De onderwerpen gedurende dit programma gaat over de
							Trans-Atlantische slavernij, kolonialisme en de historische
							periodes die van belang zijn geweest voor de opbouw van de huidige
							samenleving. Door dit soort onderwerpen aan te kaarten en met
							elkaar in gesprek te gaan versterkt dit de identiteit van de
							deelnemers, bewustwording en hun positie binnen de Nederlandse
							samenleving.
						</p>

						<p>
							Ook leren de verschillende publieksgroepen elkaar hierdoor te
							respecteren er wordt wederzijds begrip naar elkaar geuit wat kan
							leiden tot sociale cohesie en verbroedering onder elkaar. Dit
							project is in het kader van de afschaffing van de
							Trans-Atlantische slavernij door Nederland in Suriname en de
							voormalige Nederlandse Antillen. Dit project is in samenwerking
							met{' '}
							<a
								href='https://untold.nl'
								rel='noopener noreferrer'
								target='_blank'>
								Untold Empowerment
							</a>
							.
						</p>

						<p>
							<u>Voor wie</u>
							<br />
							Tieners, jongeren & volwassenen
						</p>

						<p>
							<u>Leeftijd</u>
							<br />
							Vanaf 13 jaar en ouder
						</p>

						<p>
							<u>Beginners</u>
							<br />
							Dinsdagavond
						</p>

						<p>
							<u>Gevorderden</u>
							<br />
							Woensdagavond
						</p>

						<p>
							<u>Planning</u>
							<br />
							Wordt via onze social media kanalen bekend gemaakt
						</p>

						<p>
							<u>Kosten</u>
							<br />
							Gratis
						</p>

						<p>
							Meld jezelf of uw kind nu direct aan via het{' '}
							<a href='#' onClick={(event) => handleClick(inputRef, event)}>
								online inschrijfformulier
							</a>
							, via de mail{' '}
							<a
								href={`mailto:${email}`}
								rel='noopener noreferrer'
								target='_blank'>
								{email}
							</a>{' '}
							of telefonisch via{' '}
							<a
								href={`tel:+${mobileRaw}`}
								rel='noopener noreferrer'
								target='_blank'>
								06 242 55 391
							</a>
							.
						</p>

						<p>
							Ben je niet ouder dan 18 jaar? Vraag dan even toestemming aan jouw
							ouders.
						</p>
					</section>
				</div>
			</section>
		</>
	);
};

export default SankofaAcademy;

export const Head: HeadFC = () => (
	<Seo
		title='Sankofa Academy'
		pathname='/projecten/sankofa-academy/'
		description='Ontdek Sankofa Academy: empower en emancipeer mensen van Afrikaanse afkomst. Leer over gedeelde geschiedenis, identiteit en bewustzijn.'
	/>
);
