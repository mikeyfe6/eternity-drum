import React from "react";

import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import NewsletterForm from "../forms/newsletterForm";

import menefexLogo from "../../images/menefex/menefex-logo.svg";

import * as styles from "../../styles/modules/layout/footer.module.scss";

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
		mobileRaw,
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
					<div>
						<div className={styles.footerColumn}>
							<h4>Contactgegevens</h4>
							<br />
							<strong>{companyName}</strong>
							<h5>Bezoekadres:</h5>
							<ul>
								<li>
									<a
										href="https://maps.app.goo.gl/MGox9UBh15DWsfLg8"
										rel="noopener noreferrer"
										target="_blank"
									>
										Kruitbergstraat 18
									</a>
								</li>
								<li>{`1104 CH ${city}`}</li>
							</ul>
							<h5>Postadres:</h5>
							<ul>
								<li>
									<a
										href="https://maps.app.goo.gl/exZZFm9LkUFDrsEH7"
										rel="noopener noreferrer"
										target="_blank"
									>
										{address}
									</a>
								</li>
								<li>{`${postalCode} ${city}`}</li>
							</ul>
							<ul>
								<li>
									<FontAwesomeIcon icon={"envelope"} />
									<a
										href={`mailto:${email}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										<strong>{email}</strong>
									</a>
								</li>
								<li>
									<FontAwesomeIcon icon={"drum"} />
									<a
										href={`tel:+${phoneRawSeda}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										<strong>{telephoneSeda}</strong> (SEDA)
									</a>
								</li>
								<li>
									<FontAwesomeIcon icon={"phone"} />
									<a
										href={`tel:+${phoneRawBpt}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										<strong>{telephoneBpt}</strong> (BPT)
									</a>
								</li>
								<li>
									<FontAwesomeIcon icon={"mobile"} />
									<a
										href={`tel:+${mobileRaw}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										<strong>{mobile}</strong> (BPT)
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
						</div>
					</div>
					<div>
						<div className={styles.footerColumn}>
							<h4>Recente Posts</h4>
							<ul>
								<li>
									<Link to="/projecten/sankofa-academy/">Sankofa Academy</Link>
								</li>
								<li>
									<Link to="/drumworkshops/summerschool-2021/">
										Summerschool 2021
									</Link>
								</li>
								<li>
									<Link to="/drumworkshops/summerschool-2020/">
										Summerschool 2020
									</Link>
								</li>
							</ul>
						</div>

						<div className={styles.footerColumn}>
							<h4>Aankomende Evenementen</h4>
							<ul>
								<li>Binnenkort meer..</li>
							</ul>
						</div>
					</div>

					<div className={styles.footerSpecialRow}>
						<div className={styles.footerColumn}>
							<h4>De stichting</h4>
							<ul>
								<li>
									<Link to="/over-ons/">Ons verhaal</Link>
								</li>
								<li>
									<Link to="/drumworkshops/">Drumworkshops</Link>
								</li>
								<li>
									<Link to="/cultuureducatie/">Cultuureducatie</Link>
								</li>
								<li>
									<Link to="/over-ons/vacatures/">Vacatures</Link>
								</li>
								<li>
									<Link to="/over-ons/contact/">Contact ons</Link>
								</li>
								<li>
									<Link to="/seda/">SEDA</Link>
								</li>
							</ul>
						</div>

						<div className={styles.footerLogoSocial}>
							<div className={styles.footerLogo}>
								<Link to="/">
									<StaticImage
										src="../../images/logo/ep-logo-small.png"
										alt={`${title} Logo`}
										placeholder="blurred"
										style={{ width: "100%" }}
									/>
								</Link>
							</div>
							<div>
								<h4>Social Media:</h4>
								<ul className={styles.footerSocialIcons}>
									<li>
										<a
											href={facebookUrl}
											rel="noopener noreferrer"
											target="_blank"
										>
											<FontAwesomeIcon icon={["fab", "facebook"]} />
										</a>
									</li>
									<li>
										<a
											href={instagramUrl}
											rel="noopener noreferrer"
											target="_blank"
										>
											<FontAwesomeIcon icon={["fab", "instagram"]} />
										</a>
									</li>
									<li>
										<a
											href={youtubeUrl}
											rel="noopener noreferrer"
											target="_blank"
										>
											<FontAwesomeIcon icon={["fab", "youtube"]} />
										</a>
									</li>
									<li>
										<a
											href={`https://wa.me/${mobileRaw}`}
											rel="noopener noreferrer"
											target="_blank"
										>
											<FontAwesomeIcon icon={["fab", "whatsapp"]} />
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<NewsletterForm />
				</div>
				<div className={styles.footerBottomBanner}>
					<p>
						© 2002 – {new Date().getFullYear()} · <strong>{companyName}</strong>{" "}
						| Powered by{" "}
						<strong>
							<a
								href="https://menefex.nl"
								rel="noopener noreferrer"
								target="_blank"
							>
								Menefex
								<img src={menefexLogo} alt="" />
							</a>
						</strong>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
