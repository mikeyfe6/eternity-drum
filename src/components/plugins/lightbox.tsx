import React, { useState, useEffect } from "react";

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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.key === "Enter") {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen]);

    // TODO: sizes implementeren in parameter

    return (
        <>
            {imageData && (
                <div onClick={openModal} style={{ cursor: "pointer" }}>
                    <GatsbyImage image={imageData} alt={alt} />
                </div>
            )}

            {isModalOpen && imageData && (
                <div
                    className={`${styles.modal} lightbox-modal`}
                    data-main-modal
                >
                    <div className={styles.modalContent}>
                        <button
                            className={styles.modalClose}
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        {imageData && (
                            <div>
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
