import React from 'react';

import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { useSiteMetadata } from '../hooks/use-site-metadata';

import NewsletterForm from './newsletterForm';

import menefexLogo from '../images/menefex/menefex-logo.svg';

import * as styles from '../styles/modules/footer.module.scss';

const Footer = () => {
	const {
		companyName,
		address,
		postalCode,
		city,
		telephoneBpt,
		telephoneSeda,
		phoneRawBpt,
		phoneRawSeda,
		mobile,
		email,
		kvk,
		btw,
		facebookUrl,
		instagramUrl,
		// linkedinUrl,
		youtubeUrl,
		title,
	} = useSiteMetadata();

	return (
		<footer className={styles.footerContainer}>
			<div className={styles.footerWrapper}>
				<div className={styles.footerUpperBanner}>
					<section>
						<section className={styles.footerColumn}>
							<h4>Contactgegevens</h4>
							<br />
							<strong>{companyName}</strong>
							<h5>Bezoekadres:</h5>
							<ul>
								{/* <li>
									<strong>{companyName}</strong>
								</li> */}
								<li>
									{' '}
									<a
										href='https://maps.app.goo.gl/MGox9UBh15DWsfLg8'
										rel='noopener noreferrer'
										target='_blank'
									>
										Kruitbergstraat 18
									</a>
								</li>
								<li>{`1104 CH ${city}`}</li>
							</ul>
							<h5>Postadres:</h5>
							<ul>
								{/* <li>
									<strong>{companyName}</strong>
								</li> */}
								<li>
									<a
										href='https://maps.app.goo.gl/exZZFm9LkUFDrsEH7'
										rel='noopener noreferrer'
										target='_blank'
									>
										{address}
									</a>
								</li>
								<li>{`${postalCode} ${city}`}</li>
							</ul>
							<ul>
								<li>
									<i className='fas fa-envelope' />
									<a
										href={`mailto:${email}`}
										rel='noopener noreferrer'
										target='_blank'
									>
										<strong>{email}</strong>
									</a>
								</li>
								<li>
									<i className='fas fa-drum' />
									<a
										href={`tel:+${phoneRawSeda}`}
										rel='noopener noreferrer'
										target='_blank'
									>
										<strong>{telephoneSeda}</strong> (SEDA)
									</a>
								</li>
								<li>
									<i className='fas fa-phone' />
									<a
										href={`tel:+${phoneRawBpt}`}
										rel='noopener noreferrer'
										target='_blank'
									>
										<strong>{telephoneBpt}</strong> (BPT)
									</a>
								</li>
							</ul>
							<ul>
								<li>
									<strong>KvK:</strong> {kvk}
								</li>
								<li>
									<strong>BTW:</strong> {btw}
								</li>
							</ul>
						</section>
					</section>
					<section>
						<section className={styles.footerColumn}>
							<h4>Recente Posts</h4>
							<ul>
								<li>
									<Link to='/projecten/sankofa-academy/'>Sankofa Academy</Link>
								</li>
								<li>
									<Link to='/drumworkshops/summerschool-2020/'>
										Summerschool 2020
									</Link>
								</li>
								<li>
									<Link to='/drumworkshops/summerschool-2021/'>
										Summerschool 2021
									</Link>
								</li>
							</ul>
						</section>

						<section className={styles.footerColumn}>
							<h4>Aankomende Evenementen</h4>
							<ul>
								<li>
									<Link to='/#!'>Optreden 1 @ Bijlmer Parktheater</Link>
								</li>
								<li>
									<Link to='/#!'>Optreden 2 @ Almere</Link>
								</li>
								<li>
									<Link to='/#!'>Optreden 3 @ Amsterdam</Link>
								</li>
								<li>
									<Link to='/#!'>Concert 1 @ Nijmegen</Link>
								</li>
								<li>
									<Link to='/#!'>Uitwisseling 1 @ Breda</Link>
								</li>
								<li>
									<Link to='/#!'>Excursie 1 @ Zuid-Afrika</Link>
								</li>
								<li>
									<Link to='/#!'>Uitwisseling 2 @ Breda</Link>
								</li>
							</ul>
						</section>
					</section>

					<section className={styles.footerSpecialRow}>
						<section className={styles.footerColumn}>
							<h4>De stichting</h4>
							<ul>
								<li>
									<Link to='/over-ons/'>Ons verhaal</Link>
								</li>
								<li>
									<Link to='/drumworkshops/'>Drumworkshops</Link>
								</li>
								<li>
									<Link to='/cultuureducatie/'>Cultuureducatie</Link>
								</li>
								<li>
									<Link to='/over-ons/vacatures/'>Vacatures</Link>
								</li>
								<li>
									<Link to='/over-ons/contact/'>Contact ons</Link>
								</li>
								<li>
									<Link to='/seda/'>SEDA</Link>
								</li>

								{/* <li>
									<Link to='/#!'>
										Sitemap{' '}
										<i className='fa-solid fa-up-right-from-square fa-xs' />
									</Link>
								</li> */}
							</ul>
						</section>

						<section className={styles.footerLogoSocial}>
							<div className={styles.footerLogo}>
								<Link to='/'>
									<StaticImage
										src='../images/logo/ep-logo-small.png'
										alt={`${title} Logo`}
										placeholder='blurred'
										style={{ width: '100%' }}
									/>
								</Link>
							</div>
							<div>
								<h4>Social Media:</h4>
								<ul className={styles.footerSocialIcons}>
									<li>
										<a
											href={facebookUrl}
											rel='noopener noreferrer'
											target='_blank'
										>
											<i className='fab fa-facebook' />
										</a>
									</li>
									<li>
										<a
											href={instagramUrl}
											rel='noopener noreferrer'
											target='_blank'
										>
											<i className='fab fa-instagram' />
										</a>
									</li>
									{/* <li>
										<a
											href={linkedinUrl}
											rel='noopener noreferrer'
											target='_blank'
										>
											<i className='fab fa-linkedin' />
										</a>
									</li> */}
									<li>
										<a
											href={youtubeUrl}
											rel='noopener noreferrer'
											target='_blank'
										>
											<i className='fab fa-youtube' />
										</a>
									</li>
									<li>
										<a
											href={`https://wa.me/${mobile}`}
											rel='noopener noreferrer'
											target='_blank'
										>
											<i className='fab fa-whatsapp' />
										</a>
									</li>
								</ul>
							</div>
						</section>
					</section>

					<NewsletterForm />
				</div>
				<div className={styles.footerBottomBanner}>
					<p>
						© 2002 – {new Date().getFullYear()} · <strong>{companyName}</strong>{' '}
						| Powered by{' '}
						<strong>
							<a
								href='https://menefex.nl'
								rel='noopener noreferrer'
								target='_blank'
							>
								Menefex
								<img src={menefexLogo} alt='' />
							</a>
						</strong>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
