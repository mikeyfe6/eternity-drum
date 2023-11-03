import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMaps = () => {
	const defaultProps = {
		center: {
			lat: 52.31453,
			lng: 4.960213,
		},
		zoom: 14,
	};

	return (
		<div style={{ height: '400px', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<AnyReactComponent
					lat={defaultProps.center.lat}
					lng={defaultProps.center.lng}
					text='Your Marker Text'
				/>
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMaps;
