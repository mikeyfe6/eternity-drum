import React from "react";

import { Link, HeadFC, PageProps } from "gatsby";

import { Seo } from "../components/seo";

import * as styles from "../styles/modules/pages/notfound.module.scss";

const NotFound: React.FC<PageProps> = () => {
	return (
		<section data-main-section>
			<h1>Ojee.. Pagina niet gevonden</h1>
			<br />
			<p style={{ fontSize: "1.125rem" }}>
				We hebben ons best gedaan, maar het lijkt erop dat deze pagina niet
				(meer) bestaat of misschien verhuisd is.
				<br />
				{process.env.NODE_ENV === "development" ? (
					<>
						<br />
						Try creating a page in <code>src/pages/</code>.
						<br />
					</>
				) : null}
				<br />
			</p>

			<button type="button" className={styles.notfoundButton}>
				<Link to="/">Ga terug naar de homepagina..</Link>
			</button>
		</section>
	);
};

export default NotFound;

export const Head: HeadFC = () => (
	<Seo title="Pagina niet gevonden!" pathname="/404/" />
);
