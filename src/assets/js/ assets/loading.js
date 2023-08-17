export default () => {

	/**
	* Loading
	*/
	const html = document.documentElement;
	const body = document.body;
	const loadingItem = document.querySelector('.js-loading');

	if (!loadingItem) {
		return;
	}

	// ローディング中は画面固定
	html.style.overflow = 'hidden';
	body.style.overflow = 'hidden';

	const loaded = () => {
		if (!loadingItem) {
			return;
		}
		loadingItem.classList.add('is-loaded');
		html.style.overflow = null;
		body.style.overflow = null;
		setTimeout(() => {
			loadingItem.remove();
		}, 1000);
	};

	window.onload = () => {
		setTimeout(loaded, 500);
	}

	setTimeout(loaded, 5000); // 読み込みが遅すぎるときの最大時間
}
