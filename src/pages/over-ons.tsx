import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { StaticImage } from 'gatsby-plugin-image';

import { Seo } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

const OverOns: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Over Ons' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />
				<h1>Over Ons</h1>
				<section data-main-content className='page-content image-right'>
					<div>
						<p>
							<b>Eternity</b> wilt als culturele instelling een bijdrage leveren
							aan talentontwikkeling, cultuurparticipatie en visieverbreding van
							jongeren. Door inzet van jongeren in de eigen organisatie op
							vitale posities, biedt Eternity jongeren de gelegenheid om
							cultureel te ondernemen en participeren binnen de Nederlandse
							samenleving. Hét middel om dit te bereiken is muziekeducatie. De
							organisatie biedt muzikaal vormende programma's aan waarin
							jongeren kennismaken met de Caribische drumstijl, hun talenten
							ontwikkelen en zich als artiest bekwamen.
						</p>
						<p>
							<strong>Doelstellingen:</strong>
							<br />
							Eternity is een culturele instelling die zich bezighoudt met
							activiteiten, projecten en evenementen op het gebied van muzikale
							vorming en performance.
						</p>
						<p>
							<strong>De organisatie heeft als doel:</strong>
							<ul>
								<li>
									Het bieden van een platform voor drummers die bezig zijn met
									Caribische muziekstijlen.{' '}
								</li>
								<li>
									Het ontwikkelen van trajecten ter bevordering van muzikale
									vaardigheden.{' '}
								</li>
								<li>
									{' '}
									Het programmeren van drumshows bij (semi) professionele podia.
								</li>
								<li>
									{' '}
									Bevorderen van samenwerking tussen zelforganisaties en
									gevestigde instellingen voor de nodige doorstroming van
									getalenteerde jongeren.
								</li>
							</ul>
						</p>
						<p>
							<strong>Doelgroepen:</strong>
							<ul>
								<li>
									Kinderen, jongeren en jongvolwassenen die affiniteit hebben
									met Caribische muziekstijlen.
								</li>
							</ul>
						</p>
						<p>
							<strong>
								Daarnaast richt Eternity zich op de volgende afgeleide
								doelgroepen:
							</strong>
							<ul>
								<li>
									Afnemers van optredens (particulieren, bedrijven, festivals,
									podia en instellingen)
								</li>
								<li> Bezoekers, muziekliefhebbers</li>
								<li>
									Professionals uit de muzieksector (musici, programmeurs,
									managers, boekers, etc.)
								</li>
							</ul>
						</p>
					</div>
					<div>
						<StaticImage
							src='../images/over-ons.jpg'
							alt={`Logo`}
							placeholder='dominantColor'
							style={{
								width: '100%',
								objectPosition: 'center',
								objectFit: 'cover',
							}}
						/>
					</div>
				</section>
			</section>
		</Layout>
	);
};

export default OverOns;

export const Head: HeadFC = () => <Seo title='Over Ons' />;
