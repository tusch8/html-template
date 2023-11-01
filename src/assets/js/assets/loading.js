const html = document.documentElement;
const body = document.body;
const loadingEl = document.querySelector('.js-loading');

/**
 * ローディング画面を表示時に背景を固定する関数
 */
export const LoadingSet = () => {
	if (!loadingEl) {
		return;
	}

	// ローディング中は画面固定
	html.style.overflow = 'hidden';
	body.style.overflow = 'hidden';
}

/**
 * ローディング画面を非表示にする関数
 */
export const LoadingHide = () => {

	if (!loadingEl || loadingEl.classList.contains('is-loaded')) {
		return;
	}

	loadingEl.classList.add('is-loaded');
	html.style.overflow = null;
	body.style.overflow = null;
	setTimeout(() => {
		loadingEl.remove();
	}, 1000);

}
