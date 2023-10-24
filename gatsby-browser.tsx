export const onServiceWorkerUpdateReady = () => window.location.reload();

export const onRouteUpdate = ({ location, prevLocation }) => {
	if (location !== prevLocation) {
		window.scrollTo(0, 0);
	}
};
