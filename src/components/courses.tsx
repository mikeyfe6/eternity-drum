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
			<div>
				<p>
					<i className='fa-solid fa-circle-exclamation' />
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
						Drumpad + Drumstokken:{' '}
						<a
							href='https://www.thomann.de/nl/millenium_ak25_uebungs_pad_set.htm?glp=1&gclid=CjwKCAjwvtX0BRAFEiwAGWJyZHw0gx3fb4kZY_NruwUV9UVgpPJ9omqcR6lWUJnmxDssJGZZq6tk7xoCCcsQAvD_BwE'
							rel='noopener noreferrer'
							target='_blank'
						>
							ga naar website{' '}
							<i className='fa-solid fa-up-right-from-square fa-xs' />
						</a>
					</li>
					<li>
						Metronome (Play store):{' '}
						<a
							href='https://play.google.com/store/apps/details?id=com.eumlab.android.prometronome&gl=NL'
							rel='noopener noreferrer'
							target='_blank'
						>
							download de app{' '}
							<i className='fa-solid fa-up-right-from-square fa-xs' />
						</a>
					</li>
					<li>
						Metronome (App store):{' '}
						<a
							href='https://apps.apple.com/us/app/metronome-%CF%9F/id416443133'
							rel='noopener noreferrer'
							target='_blank'
						>
							download de app{' '}
							<i className='fa-solid fa-up-right-from-square fa-xs' />
						</a>
					</li>
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
