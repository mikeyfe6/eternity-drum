import React, { useState } from 'react';
import YoutubePlayer from '../components/youtubePlayer';
import * as styles from '../styles/modules/courses.module.scss';

const Courses: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	return (
		<section className={styles.coursesContainer}>
			<h2>Online Cursussen</h2>
			<div>
				<p>
					Hoewel eerder, door de impact van het coronavirus (COVID-19), de
					overheid maatregelen moest treffen die onze reguliere lessen
					beïnvloedden, boden we destijds online lessen aan als een tijdelijke
					oplossing. Deze zijn nu nog steeds beschikbaar, maar volledig
					optioneel, waardoor kijkers thuis de kans krijgen om deel te nemen.
					Onze doelgroep richt zich vooral op jongeren vanaf 6 jaar en ouder.
				</p>
				<p>
					Als uw kind optimaal van de drumlessen wil genieten, zijn de volgende
					attributen aan te raden, verkrijgbaar bij de meeste muziekwinkels:
				</p>
				<ul>
					<li>Drumpad + Drumstokken: klik hier</li>
					<li>Metronome (Play store): download hier</li>
					<li>Metronome (App store): download hier</li>
				</ul>

				<button onClick={toggleCollapse}>
					{(collapsed && <>Ontdek onze ONLINE drumlessen</>) || (
						<>Verberg de video</>
					)}
				</button>
				{!collapsed && (
					<>
						<hr />
						<YoutubePlayer videoId='videoseries?list=PLwjmiZZzmbwEN_tw2_XgNjuDHz_X8LOqF' />
					</>
				)}
			</div>
		</section>
	);
};

export default Courses;
