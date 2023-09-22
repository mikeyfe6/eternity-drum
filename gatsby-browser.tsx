export const onServiceWorkerUpdateReady = () => window.location.reload();

// * Met confirm optie is hier beneden....
// export const onServiceWorkerUpdateReady = () => {
// 	const answer = window.confirm(
// 		`De webapp heeft updates! ` + `Herladen om de nieuwste versie te zien?`
// 	);

// 	if (answer === true) {
// 		window.location.reload();
// 	}
// };
