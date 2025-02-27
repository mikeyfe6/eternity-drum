import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import News from "../../components/ui/news";

const Nieuws: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Over Ons", link: "/nieuws/" },
		{ label: "Nieuws" },
	];

	return (
		<>
			<Hero />
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Nieuws</h1>
			</section>
			<section data-main-section>
				<News />
			</section>
		</>
	);
};

export default Nieuws;

export const Head: HeadFC = () => (
	<Seo title="Nieuws" pathname="/over-ons/nieuws/" />
);
