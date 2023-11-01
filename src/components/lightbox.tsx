import React, { useState } from 'react';

import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/lightbox.module.scss';

const LightBox = ({
	image,
	alt,
}: {
	image: IGatsbyImageData | undefined;
	alt: string;
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		document.body.style.overflow = 'hidden';
	};
	const closeModal = () => {
		setIsModalOpen(false);
		document.body.style.overflow = 'visible';
	};

	const imageData = image ? getImage(image) : null;

	return (
		<>
			{imageData && (
				<div onClick={openModal} style={{ cursor: 'pointer' }}>
					<GatsbyImage image={imageData} alt={alt} />
				</div>
			)}

			{isModalOpen && imageData && (
				<div className={styles.modal} data-main-modal>
					<div className={styles.modalContent}>
						<span className={styles.modalClose} onClick={closeModal}>
							&times;
						</span>
						{imageData && (
							<div onClick={openModal}>
								<GatsbyImage
									image={imageData}
									alt={alt}
									className={styles.modalImage}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default LightBox;
