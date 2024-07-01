export default () => {

	const pageTop = document.querySelector('[data-page-top]');

	// このエリアをすぎたら表示
	const hide = document.querySelector('[data-page-top-hide]');

	// この要素の上でストップさせる
	const stop = document.querySelector('[data-page-top-stop]');

	const SHOW_CLASS = 'is-show';
	const STOP_CLASS = 'is-stop';

	if (!pageTop) {
		return;
	}

	// 指定した要素の半分過ぎたら表示
	const pageTopShowOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.5,
	};

	const pageTopShowObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				pageTop.classList.remove(SHOW_CLASS);
			} else {
				pageTop.classList.add(SHOW_CLASS);
			}
		});
	}, pageTopShowOptions);

	pageTopShowObserver.observe(hide);

	// 指定した要素が見えたら固定
	const pageTopStopOptions = {
		root: null,
		rootMargin: "-99% 0px 0px 0px", // -100%にすると一番下に行ったとき外れちゃう
		threshold: 0,
	};

	const pageTopStopObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				pageTop.classList.add(STOP_CLASS);
			} else {
				pageTop.classList.remove(STOP_CLASS);
			}
		});
	}, pageTopStopOptions);

	pageTopStopObserver.observe(stop);
}
