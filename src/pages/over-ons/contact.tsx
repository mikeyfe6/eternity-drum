import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { useSiteMetadata } from '../../hooks/use-site-metadata';

import { Seo } from '../../components/seo';

import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';
import GoogleMaps from '../../components/maps';

import * as styles from '../../styles/modules/contact.module.scss';

const Contact: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Over Ons', link: '/over-ons/' },
		{ label: 'Contact' },
	];

	const {
		companyName,
		address,
		postalCode,
		city,
		phoneRawSeda,
		phoneRawBpt,
		mobileRaw,
		email,
		kvk,
		btw,
		bank,
		facebookUrl,
		instagramUrl,
		// linkedinUrl,
		youtubeUrl,
	} = useSiteMetadata();

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Contact</h1>
				<section data-main-content className='page-content maps'>
					<section className={styles.contactWrapper}>
						<h3>{companyName}</h3>
						<ul>
							<li>
								<span>Adres</span> <span>{address}</span>
							</li>
							<li>
								<span>Postcode</span> <span>{postalCode}</span>
							</li>
							<li>
								<span>Plaats</span> <span>{city}</span>
							</li>
							<li>
								<span>Telefoon (SEDA)</span>
								<span>
									<a
										href={`tel:+${phoneRawSeda}`}
										rel='noopener noreferrer'
										target='_blank'>
										020 311 39 33
									</a>
								</span>
							</li>
							<li>
								<span>Telefoon (BPT)</span>
								<span>
									<a
										href={`tel:+${phoneRawBpt}`}
										rel='noopener noreferrer'
										target='_blank'>
										020 311 39 33
									</a>
								</span>
							</li>
							<li>
								<span>Mobiel</span>
								<span>
									<a
										href={`tel:+${mobileRaw}`}
										rel='noopener noreferrer'
										target='_blank'>
										06 242 55 391
									</a>
								</span>
							</li>
							<li>
								<span>E-mailadres</span>{' '}
								<span>
									<a
										href={`mailto:${email}`}
										rel='noopener noreferrer'
										target='_blank'>
										{email}
									</a>
								</span>
							</li>
							<li>
								<span>KVK-nummer</span> <span>{kvk}</span>
							</li>
							<li>
								<span>BTW-nummer</span> <span>{btw}</span>
							</li>
							<li>
								<span>Rekeningnummer</span> <span>{bank}</span>
							</li>
						</ul>
						<h3>Social Media Kanalen</h3>
						<ul>
							<li>
								<a href={facebookUrl} rel='noopener noreferrer' target='_blank'>
									<span>Facebook</span>
									<i className='fab fa-facebook' />
								</a>
							</li>
							<li>
								<a
									href={instagramUrl}
									rel='noopener noreferrer'
									target='_blank'>
									<span>Instagram</span>
									<i className='fab fa-instagram' />
								</a>
							</li>
							{/* <li>
								<a href={linkedinUrl} rel='noopener noreferrer' target='_blank'>
									<span>Linkedin</span>
									<i className='fab fa-linkedin' />
								</a>
							</li> */}
							<li>
								<a href={youtubeUrl} rel='noopener noreferrer' target='_blank'>
									<span>Youtube</span>
									<i className='fab fa-youtube' />
								</a>
							</li>
						</ul>
						<p>
							We zijn ook bereikbaar via{' '}
							<a
								href={`https://wa.me/${mobileRaw}`}
								rel='noopener noreferrer'
								target='_blank'>
								<span>Whatsapp</span> <i className='fab fa-whatsapp' />
							</a>
						</p>
					</section>
					<GoogleMaps />
				</section>
			</section>
		</>
	);
};

export default Contact;

export const Head: HeadFC = () => (
	<Seo
		title='Contact'
		pathname='/over-ons/contact/'
		description='Contacteer ons voor directe communicatie! Ontdek onze locatie in Amsterdam Zuidoost, bel, e-mail of volg ons op sociale media. Bij Eternity bieden we verschillende communicatiekanalen, waaronder WhatsApp.'
	/>
);
