export default () => {

	const navBtn = document.querySelector('.js-nav-btn');
	const navCon = document.querySelector('.js-nav-content');
	const navOverlay = document.querySelector('.js-nav-overlay');
	const navAnchors = navCon.querySelectorAll('a');

	if (!navBtn || !navCon) {
		return;
	}

	const toggleNav = () => {
		navBtn.classList.toggle('is-open');
		navCon.classList.toggle('is-open');
		navOverlay.classList.toggle('is-open');
	}

	navBtn.addEventListener('click', () => {
		toggleNav();
	});
	navOverlay.addEventListener('click', () => {
		toggleNav();
	});

	// ページ内リンクのときも閉じる
	navAnchors.forEach(anchor => {
		anchor.addEventListener('click', () => {
			if (navBtn.classList.contains('is-open')) {
				toggleNav();
			}
		})
	});
}
