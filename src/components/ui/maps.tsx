import React from "react";
import GoogleMapReact from "google-map-react";

import epLogo from "../../images/logo/ep-logo-small.png";

import * as styles from "../../styles/modules/components/maps.module.scss";

interface MarkerProps {
	lat: number;
	lng: number;
}

interface DefaultProps {
	center: {
		lat: number;
		lng: number;
	};
	zoom: number;
}

const Marker: React.FC<MarkerProps> = ({ lat, lng }) => (
	<div data-lat={lat} data-lng={lng} className={styles.marker}>
		<img src={epLogo} alt="Eternity Percussion" />
	</div>
);

const GoogleMaps = () => {
	const defaultProps: DefaultProps = {
		center: {
			lat: 52.31778767284739,
			lng: 4.978261737097896,
		},
		zoom: 16,
	};

	return (
		<div className={styles.mapsContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<Marker lat={52.31796830934763} lng={4.9778735331231525} />
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMaps;
