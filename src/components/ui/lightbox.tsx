import React, { useState } from "react";

import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

import * as styles from "../../styles/modules/components/lightbox.module.scss";

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
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const imageData = image ? getImage(image) : null;

	// TODO: sizes implementeren in parameter

	return (
		<>
			{imageData && (
				<div onClick={openModal} style={{ cursor: "pointer" }}>
					<GatsbyImage image={imageData} alt={alt} />
				</div>
			)}

			{isModalOpen && imageData && (
				<div className={`${styles.modal} lightbox-modal`} data-main-modal>
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
									objectFit="contain"
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
