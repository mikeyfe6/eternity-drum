import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import GoogleMaps from "../../components/ui/maps";

import * as styles from "../../styles/modules/pages/contact.module.scss";

const Contact: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Over Ons", link: "/over-ons/" },
		{ label: "Contact" },
	];

	const {
		companyName,
		visitingAddress,
		visitingPostalCode,
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
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Contact</h1>
			</section>
			<section data-main-section>
				<div className="page-content contact">
					<div className={styles.contactWrapper} data-main-content>
						<h2>{companyName}</h2>
						<ul>
							<li>
								<span>Adres</span> <span>{visitingAddress}</span>
							</li>
							<li>
								<span>Postcode</span> <span>{visitingPostalCode}</span>
							</li>
							<li>
								<span>Plaats</span> <span>{city}</span>
							</li>
							<li>
								<span>Telefoon (SEDA)</span>
								<span>
									<a
										href={`tel:+${phoneRawSeda}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										020 773 38 88
									</a>
								</span>
							</li>
							<li>
								<span>Telefoon (BPT)</span>
								<span>
									<a
										href={`tel:+${phoneRawBpt}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										020 311 39 33
									</a>
								</span>
							</li>
							<li>
								<span>Mobiel</span>
								<span>
									<a
										href={`tel:+${mobileRaw}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										06 242 55 391
									</a>
								</span>
							</li>
							<li>
								<span>E-mailadres</span>{" "}
								<span>
									<a
										href={`mailto:${email}`}
										rel="noopener noreferrer"
										target="_blank"
									>
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
						<h5>Social Media:</h5>
						<ul>
							<li>
								<a href={facebookUrl} rel="noopener noreferrer" target="_blank">
									<span>Facebook</span>
									<FontAwesomeIcon icon={["fab", "facebook"]} />
								</a>
							</li>
							<li>
								<a
									href={instagramUrl}
									rel="noopener noreferrer"
									target="_blank"
								>
									<span>Instagram</span>
									<FontAwesomeIcon icon={["fab", "instagram"]} />
								</a>
							</li>
							{/* <li>
								<a href={linkedinUrl} rel="noopener noreferrer" target="_blank">
									<span>LinkedIn</span>
									<FontAwesomeIcon icon={["fab", "linkedin"]} />
								</a>
							</li> */}
							<li>
								<a href={youtubeUrl} rel="noopener noreferrer" target="_blank">
									<span>Youtube</span>
									<FontAwesomeIcon icon={["fab", "youtube"]} />
								</a>
							</li>
						</ul>
						<p>
							We zijn ook bereikbaar via{" "}
							<a
								href={`https://wa.me/${mobileRaw}`}
								rel="noopener noreferrer"
								target="_blank"
							>
								<span>Whatsapp</span>{" "}
								<FontAwesomeIcon icon={["fab", "whatsapp"]} />
							</a>
						</p>
					</div>
					<GoogleMaps />
				</div>
			</section>
		</>
	);
};

export default Contact;

export const Head: HeadFC = () => (
	<Seo
		title="Contact"
		pathname="/over-ons/contact/"
		description="Contacteer ons voor directe communicatie! Ontdek onze locatie in Amsterdam Zuidoost, bel, e-mail of volg ons op sociale media. Bij Eternity bieden we verschillende communicatiekanalen, waaronder WhatsApp."
	/>
);
