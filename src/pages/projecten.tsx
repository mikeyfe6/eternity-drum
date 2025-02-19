import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";

import { useSiteMetadata } from "../hooks/use-site-metadata";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";

import Hero from "../components/layout/heroslider";
import YouTubePlayer from "../components/ui/youtubePlayer";

const Projecten: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Projecten" }];

	const { email } = useSiteMetadata();

	return (
		<>
			<Hero />
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Projecten</h1>
			</section>
			<section data-main-section>
				<div data-main-content className="page-content projects">
					<h2>Nieuwe (uitwisselings)projecten !</h2>
					<h3>Building Strong Communities</h3>
					<p>
						Met het project "Building Strong Communities" organiseert Eternity
						maandelijkse bijeenkomsten voor jongeren uit Amsterdam Zuidoost die
						gaan over identiteit, de bijdragen die zwarte mensen hebben geleverd
						aan de samenleving en informatie over het Nederlands
						slavernijverleden. Elke maand vind er een bijeenkomst plaats voor 15
						t/m 20 jongeren waarbij ze op interactieve wijze kennis maken met
						verschillende facetten over de zwarte geschiedenis,
						Trans-Atlantische slavernij en empowerment. Een aantal bijeenkomsten
						zullen ook in Amsterdam Oost plaatsvinden en in de binnenstad van
						Amsterdam. Reden hiervoor is dat daar allerlei belangrijke plekken
						zijn die illustratief zijn voor het slavernijverleden.
					</p>
					<br />
					<p>
						<b>Periode:</b> juni t/m november 2021
					</p>
					<p>
						<b>Aanmelden:</b>{" "}
						<a
							href={`mailto:${email}`}
							rel="noopener noreferrer"
							target="_blank"
						>
							{email}
						</a>
					</p>
					<p>
						<b>Projectleider:</b> Revelino Pinas
					</p>
					<br />
					<p>
						Mede mogelijk gemaakt door{" "}
						<a
							href="https://www.europeansolidaritycorps.nl"
							rel="noopener noreferrer"
							target="_blank"
						>
							European Solidarity Corps
						</a>
					</p>

					<br />
					<hr />
					<br />

					<h3>Get Up Stand Up</h3>
					<p>
						"Get Up Stand Up" is een Europese uitwisselingsprogramma tussen
						Eternity en Ebony Steelband dat zal plaatsvinden in Amsterdam en
						Londen. Doelstelling is om jongeren weerbaar te maken tegen
						onderling geweld en criminaliteit. Jongeren worden in de gelegenheid
						gesteld om deel te nemen aan verschillende workshops met betrekking
						tot het thema geweld. Denk hierbij aan workshops weerbaarheid met
						betrekking tot criminaliteit en drill muziek. Hiernaast zullen er
						ook excursies worden gemaakt naar een aantal historische
						bezienswaardigheden zowel in Amsterdam als in Londen. Deelnemende
						jongeren kunnen dan ook historische kennis opdoen en hun visie
						verbreden over de achtergrond van de bezochte plekken. Ook worden er
						in Amsterdam en Londen wijken bezocht waar de jongeren wonen. Dit
						geeft beide groepen deelnemers meer kennis over de
						leefomstandigheden van hun leeftijdsgenoten.
					</p>
					<br />
					<p>
						<b>Periode:</b> juli 2020 in Amsterdam & oktober 2020 in Londen
					</p>
					<p>
						<b>Aanmelden:</b>{" "}
						<a
							href={`mailto:${email}`}
							rel="noopener noreferrer"
							target="_blank"
						>
							{email}
						</a>
					</p>
					<p>
						<b>Projectleider:</b> Derillio Alexander
					</p>
					<br />
					<p>
						Mede mogelijk gemaakt door{" "}
						<a
							href="https://www.erasmusplus.nl"
							rel="noopener noreferrer"
							target="_blank"
						>
							Erasmus+
						</a>
					</p>

					<br />
					<hr />
					<br />

					<div className="pjs-image-left">
						<div>
							<StaticImage
								src="../images/projects/beats-group.jpg"
								alt="Beats"
								placeholder="blurred"
								imgClassName="pjs-image"
								style={{ width: "100%" }}
							/>
						</div>
						<div>
							<h3>Van Hobby naar Succes</h3>
							<p>
								Is een cultureel-educatief traject waarin drumlessen worden
								aangeboden aan jongeren in zowel het onderwijs als het
								naschoolse aanbod. Een doorlopende leerlijn staat hier in
								centraal. Jongeren kunnen intern de opleiding doorlopen als
								Caribische percussionist.
							</p>
							<br />
							<h3>Beats</h3>
							<p>
								Eerste theatervoorstelling dat op zaterdag 23 november 2014 in
								première ging in het Bijlmer Parktheater.
							</p>
							<br />
							<h3>Ardennen Zomerkampen</h3>
							<p>
								Eternity organiseert elk jaar een sportieve activiteitenweek in
								de Ardennen speciaal voor jeugd uit Amsterdam Zuidoost.
							</p>
						</div>
					</div>

					<br />
					<hr />
					<br />

					<div className="pjs-image-right">
						<div>
							<p>
								<u>Afgelopen uitwisselingsprojecten zijn:</u>
							</p>
							<ul>
								<li>
									<p>
										<strong>"Modern and The Beat"</strong>, een
										uitwisselingsproject tussen Eternity en ACE in zowel
										Birmingham als in Amsterdam (augustus en september 2013).
									</p>
								</li>
								<li>
									<p>
										<strong>"Muziek als universele taal"</strong>, een
										uitwisselingsproject tussen Eternity en Batuque Batucada in
										Brazilië (oktober 2012)
									</p>
								</li>
								<li>
									<p>
										<strong>"Pass The Stick" </strong>, een uitwisselingsproject
										tussen Eternity en Ebony Steelband in Amsterdam (juli 2012)
									</p>
								</li>
							</ul>
						</div>
						<div>
							<StaticImage
								src="../images/projects/beats-theatre.jpg"
								alt="Beats"
								placeholder="blurred"
								imgClassName="pjs-image"
								style={{ width: "100%" }}
							/>
						</div>
					</div>

					<br />
					<hr />
					<br />

					<h3>"Rite of The passage"</h3>
					<p>
						In 2019 hebben Eternity en The Manhood Academy de
						uitwisselingsprogramma Rite The Passage succesvol georganiseerd voor
						jongeren uit beide organisaties. Doelstelling was om beide groepen
						jongeren bij elkaar te brengen en middels verschillende activiteiten
						elkaars leefwerelden te vergelijken. Het uitgangspunt gedurende dit
						uitwisselingsprogramma waren de overgangsrituelen vanuit een
						Afrikaans perspectief toespitsen op de deelnemende jongeren. Rite of
						Passage staat voor de reis die een jonge zwarte man ondergaat
						tijdens zijn adolescentie. Het empowerment aspect staat hierin
						centraal. De jongeren werden bewust gemaakt van hun eigen kunnen.
						Door middel van een programma bestaande uit o.a. verschillende
						workshops, culturele excursies en dialogen, worden beide
						jongerengroepen gezamenlijk getraind in verschillende sociale
						vaardigheden, sociale competenties en kennis bijgebracht over de
						Afrikaanse geschiedenis.
					</p>
					<br />
					<p>
						<b>Projectleider:</b> Jamal Bijnoe
					</p>
					<br />
					<p>
						Mede mogelijk gemaakt door{" "}
						<a
							href="https://www.erasmusplus.nl"
							rel="noopener noreferrer"
							target="_blank"
						>
							Erasmus+
						</a>
					</p>

					<div className="pjs-image-collage-top">
						<div>
							<div>
								<StaticImage
									src="../images/projects/rotp-1.jpg"
									alt="Beats"
									placeholder="blurred"
									imgClassName="pjs-image"
									style={{ width: "100%" }}
								/>
							</div>
							<div>
								<StaticImage
									src="../images/projects/rotp-2.jpg"
									alt="Beats"
									placeholder="blurred"
									imgClassName="pjs-image"
									style={{ width: "100%" }}
								/>
							</div>
						</div>
						<div>
							<StaticImage
								src="../images/projects/rotp-3.jpg"
								alt="Beats"
								placeholder="blurred"
								imgClassName="pjs-image"
								style={{ width: "100%" }}
							/>
						</div>
					</div>
					<br />
					<div className="pjs-image-collage-bottom">
						<div>
							<StaticImage
								src="../images/projects/rotp-4.jpg"
								alt="Beats"
								placeholder="blurred"
								imgClassName="pjs-image"
								style={{ width: "100%" }}
							/>
						</div>
						<div>
							<div>
								<StaticImage
									src="../images/projects/rotp-5.jpeg"
									alt="Beats"
									placeholder="blurred"
									imgClassName="pjs-image"
									style={{ width: "100%" }}
								/>
							</div>
							<div>
								<StaticImage
									src="../images/projects/rotp-6.jpeg"
									alt="Beats"
									placeholder="blurred"
									imgClassName="pjs-image"
									style={{ width: "100%" }}
								/>
							</div>
						</div>
					</div>

					<br />
					<hr />
					<br />

					<div className="pjs-image-over-text">
						<div>
							<StaticImage
								src="../images/projects/umuntu-stands.jpg"
								alt="Beats"
								placeholder="blurred"
								imgClassName="pjs-image"
								style={{ width: "100%" }}
							/>
						</div>
						<div>
							<h3>Theatervoorstelling: "UMUNTU"</h3>
							<p>
								Een groep jongeren gaat op zoek naar verschillende rituelen dat
								leidt naar hun mannelijkheid. Ze gebruiken hun passie voor
								muziek als middel om dit te bewerkstelligen. <b>Umuntu</b>{" "}
								betekent "man" in het Zuid-Afrikaans en gaat over een groep
								jongens die hun Rite of Passage doorlopen.
							</p>
							<p>
								Welke elementen en personen hebben zij nodig om succesvol te
								zijn in het leven. Welke situaties zijn er die voor blokkades /
								obstakels kunnen zorgen. En welke tools zijn er nodig om deze
								hiaten te overwinnen om weer het pad naar succes voort te
								zetten. Daarbij moet je altijd in staat zijn als succesvolle
								jongeman om een legacy achter te laten voor de volgende
								generatie. Dit is ook een op een te weerleggen als het gaat om
								vader en zoon relatie of vaderlijke rol die een persoon ten
								opzichte van een jongeman inneemt...
							</p>
							<StaticImage
								src="../images/projects/umuntu-hands.jpg"
								alt="Beats"
								placeholder="blurred"
								imgClassName="pjs-image"
							/>
						</div>
					</div>

					{/* <br />
					<hr />
					<br /> */}

					{/* <h2>MINI-DOCU'S: Uitwisselingsprojecten</h2>
					<div className='pjs-vids'>
						<div>
							<YouTubePlayer videoId='9e7lBlK0hXo' />
							<p>
								VIDEO: <strong>MODERN AND THE BEAT</strong>
							</p>
						</div>
						<div>
							<YouTubePlayer videoId='O4goCbxhNDQ' />
							<p>
								VIDEO: <strong>ETERNITY IN BRAZIL</strong>
							</p>
						</div>
					</div> */}
				</div>
			</section>
		</>
	);
};

export default Projecten;

export const Head: HeadFC = () => (
	<Seo
		title="Projecten"
		pathname="/projecten/"
		description="Ontdek de diverse jeugdprojecten van Eternity, van educatieve sessies over de zwarte geschiedenis tot uitwisselingsprogramma's in Amsterdam en Londen. Doe mee aan initiatieven zoals 'Van Hobby naar Succes' voor een culturele en educatieve reis met drumlessen."
	/>
);
