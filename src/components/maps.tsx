import React from 'react';
import GoogleMapReact from 'google-map-react';

import epLogo from '../images/logo/ep-logo-small.png';

const Marker = () => <img src={epLogo} alt='Eternity Percussion' width='75' />;

const GoogleMaps = () => {
	const defaultProps = {
		center: {
			lat: 52.31796830934763,
			lng: 4.9778735331231525,
		},
		zoom: 16,
	};

	return (
		<div style={{ height: '400px', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<Marker />
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMaps;
