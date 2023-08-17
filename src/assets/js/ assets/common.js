export default () => {

	/**
	 * Vh Calc
	 * ex. height: calc(var(--vh) * 1px * 100);
	 */
	const setVh = () => {
		const vh = window.innerHeight * 0.01;
		const html = document.documentElement;
		html.style.setProperty('--vh', vh);
	}

	let vw = window.innerWidth;
	window.addEventListener('resize', () => {
		if (vw === window.innerWidth) {
			return;
		}
		vw = window.innerWidth;
		setVh();
	});

	setVh();


}
