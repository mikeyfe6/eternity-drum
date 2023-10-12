import * as React from 'react';

import * as styles from '../styles/modules/registerform.module.scss';

const RegisterForm: React.FC = () => {
	return (
		<aside className={styles.registerformContainer}>
			<div>Aside/Sidebar Block</div>
			<br />
			<p>
				The standard chunk of Lorem Ipsum used since the 1500s is reproduced
				below for those interested. Sections 1.10.32 and 1.10.33 from "de
				Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
				original form, accompanied by English versions from the 1914 translation
				by H. Rackham.
			</p>
		</aside>
	);
};

export default RegisterForm;
