import ScrollAnimation from './scroll_animation.js';

const html = document.documentElement;
const body = document.body;
const loading = document.querySelector('.js-loading');

/**
 * ローディング画面を表示時に背景を固定する関数
 */
export const LoadingSet = () => {
	if (!loading) {
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

	if (!loading || loading.classList.contains('is-loaded')) {
		ScrollAnimation();
		return;
	}

	loading.classList.add('is-loaded');

	ScrollAnimation();

	html.style.overflow = null;
	body.style.overflow = null;
	
	setTimeout(() => {
		loading.remove();
	}, 1000);

}
