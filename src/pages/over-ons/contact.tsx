import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { useSiteMetadata } from '../../hooks/use-site-metadata';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
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
		phoneRaw,
		telephone,
		email,
		kvk,
		btw,
		bank,
		facebookUrl,
		instagramUrl,
		linkedinUrl,
		youtubeUrl,
		title,
	} = useSiteMetadata();

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Contact</h1>
				<section data-main-content className='page-content maps'>
					<section className={styles.contactWrapper}>
						<h3>{companyName}</h3>
						<ul>
							<li>
								<span>ADRES</span> <span>{address}</span>
							</li>
							<li>
								<span>POSTCODE</span> <span>{postalCode}</span>
							</li>
							<li>
								<span>PLAATS</span> <span>{city}</span>
							</li>
							<li>
								<span>TELEFOONNR</span>
								<span>06 - 242 55 391 | 020 - 311 39 33</span>
							</li>
							<li>
								<span>EMAILADRES</span> <span>{email}</span>
							</li>
							<li>
								<span>KVK</span> <span>{kvk}</span>
							</li>
							<li>
								<span>BTW</span> <span>{btw}</span>
							</li>
							<li>
								<span>REKENINGNR</span> <span>{bank}</span>
							</li>
						</ul>
						<h4>Social Media Kanalen</h4>
						<ul>
							<li>
								<a href={facebookUrl} rel='noopener noreferrer' target='_blank'>
									<span>FACEBOOK</span> <i className='fab fa-facebook' />
								</a>
							</li>
							<li>
								<a
									href={instagramUrl}
									rel='noopener noreferrer'
									target='_blank'
								>
									<span>INSTAGRAM</span> <i className='fab fa-instagram' />
								</a>
							</li>
							<li>
								<a href={linkedinUrl} rel='noopener noreferrer' target='_blank'>
									<span>LINKEDIN</span> <i className='fab fa-linkedin' />
								</a>
							</li>
							<li>
								<a href={youtubeUrl} rel='noopener noreferrer' target='_blank'>
									<span>YOUTUBE</span> <i className='fab fa-youtube' />
								</a>
							</li>
						</ul>
					</section>
					<GoogleMaps />
				</section>
			</section>
		</Layout>
	);
};

export default Contact;

export const Head: HeadFC = () => <SEO title='Contact' />;
