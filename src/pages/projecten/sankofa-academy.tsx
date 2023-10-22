import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';
import RegisterForm, { handleClick } from '../../components/registerform';

import LightBox from '../../components/lightbox';

import * as styles from '../../styles/modules/workshop.module.scss';

const Sankofa: React.FC<PageProps> = () => {
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

	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Projecten', link: '/projecten/' },
		{ label: 'Sankofa Academy' },
	];

	const inputRef = React.useRef<HTMLInputElement>(null);

	const sankofaBack = sankofaB.childImageSharp.gatsbyImageData;
	const sankofaFront = sankofaF.childImageSharp.gatsbyImageData;

	return (
		<Layout>
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
							met Untold Empowerment.
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
								online formulier
							</a>
							, via de mail <a href='#!'>info@eternitydrum.com</a> of
							telefonisch via <a href='#!'>06 24 25 53 91</a>.
						</p>

						<p>
							Ben je niet ouder dan 18 jaar? Vraag dan even toestemming aan jouw
							ouders.
						</p>
					</section>
				</div>
			</section>
		</Layout>
	);
};

export default Sankofa;

export const Head: HeadFC = () => <SEO title='Sankofa Academy' />;
