import React, { useEffect } from "react";

import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import NewsletterForm from "../forms/newsletterForm";

import menefexLogo from "../../images/menefex/menefex-logo.svg";

import * as styles from "../../styles/modules/layout/footer.module.scss";

declare global {
	interface Window {
		FB: any;
	}
}

const Footer = () => {
	const {
		companyName,
		visitingAddress,
		visitingPostalCode,
		mailingAddress,
		mailingPostalCode,
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
		youtubeUrl,
		title,
	} = useSiteMetadata();

	useEffect(() => {
		const loadFacebookSDK = () => {
			if (window.FB) {
				window.FB.XFBML.parse();
			} else {
				const script = document.createElement("script");
				script.async = true;
				script.defer = true;
				script.crossOrigin = "anonymous";
				script.src =
					"https://connect.facebook.net/nl_NL/sdk.js#xfbml=1&version=v22.0";
				document.body.appendChild(script);
			}
		};

		loadFacebookSDK();
	}, []);

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerTop}>
					<div className={styles.footerColumn}>
						<h4>Contactgegevens</h4>
						<br />
						<b>{companyName}</b>
						<h5>Bezoekadres:</h5>
						<ul>
							<li>
								<a
									href="https://maps.app.goo.gl/MGox9UBh15DWsfLg8"
									rel="noopener noreferrer"
									target="_blank"
								>
									{visitingAddress}
								</a>
							</li>
							<li>{`${visitingPostalCode} ${city}`}</li>
						</ul>
						<h5>Postadres:</h5>
						<ul>
							<li>
								<a
									href="https://maps.app.goo.gl/exZZFm9LkUFDrsEH7"
									rel="noopener noreferrer"
									target="_blank"
								>
									{mailingAddress}
								</a>
							</li>
							<li>{`${mailingPostalCode} ${city}`}</li>
						</ul>
						<ul>
							<li>
								<FontAwesomeIcon icon={"envelope"} />
								<a
									href={`mailto:${email}`}
									rel="noopener noreferrer"
									target="_blank"
								>
									<b>{email}</b>
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={"drum"} />
								<a
									href={`tel:+${phoneRawSeda}`}
									rel="noopener noreferrer"
									target="_blank"
								>
									<b>{telephoneSeda}</b> (SEDA)
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={"phone"} />
								<a
									href={`tel:+${phoneRawBpt}`}
									rel="noopener noreferrer"
									target="_blank"
								>
									<b>{telephoneBpt}</b> (BPT)
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={"mobile"} />
								<a
									href={`tel:+${mobileRaw}`}
									rel="noopener noreferrer"
									target="_blank"
								>
									<b>{mobile}</b> (BPT)
								</a>
							</li>
						</ul>
						<ul>
							<li>
								<b>KvK:</b> {kvk}
							</li>
							<li>
								<b>BTW:</b> {btw}
							</li>
						</ul>
					</div>

					<div className={styles.footerColumn}>
						<h4>Recente Posts</h4>
						<ul>
							<li>
								<Link to="/kwasi-en-yaw/">Kwasi & Yaw</Link>
							</li>
							<li>
								<Link to="/wijkimpuls/">Wijk Impuls</Link>
							</li>
							<li>
								<Link to="/bijlmer-drumfestival-2024/">
									Bijlmer Drum Festival 2024
								</Link>
							</li>
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

						<h4>Aankomende Evenementen</h4>
						<ul>
							<li>Binnenkort meer..</li>
						</ul>
					</div>

					<div className={styles.footerRowOne}>
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
									<Link to="/over-ons/contact/">Contact</Link>
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

					<div>
						<NewsletterForm />
						<div className={styles.footerFbPlugin}>
							<div id="fb-root"></div>

							<div
								className="fb-page"
								data-href="https://www.facebook.com/EternityDrum"
								data-tabs=""
								data-width=""
								data-height=""
								data-small-header="false"
								data-adapt-container-width="true"
								data-hide-cover="false"
								data-show-facepile="true"
							>
								<blockquote
									cite="https://www.facebook.com/EternityDrum"
									className="fb-xfbml-parse-ignore"
									hidden
								>
									<a href="https://www.facebook.com/EternityDrum">
										Percussionband Eternity
									</a>
								</blockquote>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>
						© 2002 – {new Date().getFullYear()} · <strong>{companyName}</strong>{" "}
						| Powered by{" "}
						<b>
							<a
								href="https://menefex.nl"
								rel="noopener noreferrer"
								target="_blank"
							>
								Menefex
								<img src={menefexLogo} alt="" />
							</a>
						</b>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
