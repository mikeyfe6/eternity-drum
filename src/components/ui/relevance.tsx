import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import YouTubePlayer from "./youtubePlayer";

const Relevance: React.FC = () => {
	return (
		<>
			<a
				href="https://www.nigelclarkepresenter.co.uk/ace-dance-rhythm-workshop/"
				rel="noopener noreferrer"
				target="_blank"
			>
				Eternity and ACE, workshop Nigel Clark
				<FontAwesomeIcon icon={"up-right-from-square"} />
			</a>
			<hr />
			<a
				href="https://museumnacht.amsterdam/programma/429/eternity-percussion/"
				rel="noopener noreferrer"
				target="_blank"
			>
				Eternity opent Museumnacht in de Nieuwe Kerk te Amsterdam
				<FontAwesomeIcon icon={"up-right-from-square"} />
			</a>
			<hr />
			<a
				href="https://www.nrc.nl/nieuws/2020/02/13/vrij-a3990200"
				rel="noopener noreferrer"
				target="_blank"
			>
				Eternity in het NRC Handelsblad
				<FontAwesomeIcon icon={"up-right-from-square"} />
			</a>
			<hr />
			<a
				href="https://www.slagwerkkrant.nl/nieuws/artikel/2-3395/eternity-wint-battle-of-the-drums-zomercarnaval"
				rel="noopener noreferrer"
				target="_blank"
			>
				Eternity wint Brassband battle 2006
				<FontAwesomeIcon icon={"up-right-from-square"} />
			</a>
			<hr />
			<a
				href="https://kunstvol.nl/amsterdam/cursussen/drummen-met-eternity-percussion/"
				rel="noopener noreferrer"
				target="_blank"
			>
				Drummen met Eternity Percussion
				<FontAwesomeIcon icon={"up-right-from-square"} />
			</a>
			<hr />
			<a
				href="https://www.bijlmerenmeer.nl/kenny-zschuschen-het-had-ook-anders-met-mij-kunnen-aflopen/"
				rel="noopener noreferrer"
				target="_blank"
			>
				Kenny Zschuschen over Eternity
				<FontAwesomeIcon icon={"up-right-from-square"} />
			</a>
			<hr />
			<b>Eternity in het Surinaamse nieuws, bekijk video:</b>
			<br />
			<br />
			<YouTubePlayer videoId="fRDGRiSMDSc" />
		</>
	);
};

export default Relevance;
