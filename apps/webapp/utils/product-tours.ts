export const startTour = (id: string): void => {
	if (!window.ProductTours) {
		console.error('Product Tours library could not be found');
	}

	window.ProductTours.startTour(id);
};
