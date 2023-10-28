export default () => {

	const pagetop = document.querySelector('.js-pagetop');
	const kv = document.querySelector('.js-kv');
	const footer = document.querySelector('.js-footer');

	if (!pagetop) {
		return;
	}

	// キービジュアルの半分過ぎたら表示
	const pagetopShowOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.5,
	};

	const pagetopShowObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				pagetop.classList.remove('is-show');
			} else {
				pagetop.classList.add('is-show');
			}
		});
	}, pagetopShowOptions);

	pagetopShowObserver.observe(kv);

	// フッター見えたら固定
	const pagetopStopOptions = {
		root: null,
		rootMargin: "-99% 0px 0px 0px", // -100%にすると一番下に行ったとき外れちゃう
		threshold: 0,
	};

	const pagetopStopObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				pagetop.classList.add('is-stop');
			} else {
				pagetop.classList.remove('is-stop');
			}
		});
	}, pagetopStopOptions);

	pagetopStopObserver.observe(footer);
}
