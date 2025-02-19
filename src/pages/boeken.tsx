import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";

import Hero from "../components/layout/heroslider";
import BookingsForm from "../components/forms/bookingsForm";

const Boeken: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Boeken" }];

	return (
		<>
			<Hero />
			<div className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Boeken</h1>
			</div>
			<section data-main-section>
				<BookingsForm />
			</section>
		</>
	);
};

export default Boeken;

export const Head: HeadFC = () => (
	<Seo
		title="Boeken"
		pathname="/boeken/"
		description="Boek Drumband Eternity Percussion voor je evenementen, jubilea, bruiloften en meer. Ons ensemble van 6 tot 15 drummers en blazers treedt op in binnen- en buitenland. Ontvang een offerte via ons online boekingsformulier of bel voor meer informatie"
	/>
);
