// export const onServiceWorkerUpdateReady = () => window.location.reload();

export const onServiceWorkerUpdateReady = () => {
	const answer = window.confirm(
		`De webapp heeft updates! ` +
			`Klik op OK om de nieuwe versie te laden ` +
	);

	if (answer === true) {
		window.location.reload();
	}
};
