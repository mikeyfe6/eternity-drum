import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import YoutubePlayer from "./youtubePlayer";

import * as styles from "../../styles/modules/components/courses.module.scss";

const Courses: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	return (
		<section className={styles.courses}>
			<p>
				<FontAwesomeIcon
					icon={"circle-exclamation"}
					className={styles.coursesIcon}
				/>
				Hoewel eerder, door de impact van het coronavirus (COVID-19), de
				overheid maatregelen moest treffen die onze reguliere lessen
				beïnvloedden, boden we destijds online lessen aan als een tijdelijke
				oplossing. Deze zijn nu nog steeds beschikbaar, waardoor kijkers thuis
				de kans krijgen om deel te nemen. Onze doelgroep richt zich vooral op
				jongeren vanaf 6 jaar en ouder.
			</p>

			<p>
				Als uw kind optimaal van de drumlessen wil genieten, zijn de volgende
				online attributen aan te raden;
			</p>
			<ul>
				<li>
					Drumpad + Drumstokken:{" "}
					<a
						href="https://www.thomann.de/nl/millenium_ak25_uebungs_pad_set.htm?glp=1&gclid=CjwKCAjwvtX0BRAFEiwAGWJyZHw0gx3fb4kZY_NruwUV9UVgpPJ9omqcR6lWUJnmxDssJGZZq6tk7xoCCcsQAvD_BwE"
						rel="noopener noreferrer"
						target="_blank"
					>
						website <FontAwesomeIcon icon={"up-right-from-square"} />
					</a>
				</li>
				<li>
					Metronome (Play store):{" "}
					<a
						href="https://play.google.com/store/apps/details?id=com.eumlab.android.prometronome&gl=NL"
						rel="noopener noreferrer"
						target="_blank"
					>
						download <FontAwesomeIcon icon={"up-right-from-square"} />
					</a>
				</li>
				<li>
					Metronome (App store):{" "}
					<a
						href="https://apps.apple.com/us/app/metronome-%CF%9F/id416443133"
						rel="noopener noreferrer"
						target="_blank"
					>
						download <FontAwesomeIcon icon={"up-right-from-square"} />
					</a>
				</li>
			</ul>

			<button onClick={toggleCollapse}>
				{(collapsed && <span>Ontdek onze ONLINE drumlessen</span>) || (
					<span>Verberg de video</span>
				)}
			</button>
			{!collapsed && (
				<>
					<hr />
					<YoutubePlayer videoId="videoseries?list=PLwjmiZZzmbwEN_tw2_XgNjuDHz_X8LOqF" />
				</>
			)}
		</section>
	);
};

export default Courses;
