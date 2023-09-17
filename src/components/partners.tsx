import * as React from 'react';

import * as styles from '../styles/modules/partners.module.scss';

const Partners: React.FC = () => {
	return (
		<section className={styles.partnersContainer}>
			<div>Partner 1</div>
			<div>Partner 2</div>
			<div>Partner 3</div>
			<div>Partner 4</div>
			<div>Partner 5</div>
		</section>
	);
};

export default Partners;
