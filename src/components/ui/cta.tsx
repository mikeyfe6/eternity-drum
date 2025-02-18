import React from "react";

import { Link } from "gatsby";

import * as styles from "../../styles/modules/components/cta.module.scss";

const CtaButtons: React.FC = () => {
	return (
		<section className={styles.cta}>
			<Link to="/boeken/">Direct Boeken</Link>
			<Link to="/drumworkshops/">Aanmelden Drumworkshops</Link>
			<Link to="/media/">Media</Link>
			<Link to="/seda/" className={styles.ctaSpecial}>
				SEDA
			</Link>
		</section>
	);
};

export default CtaButtons;
