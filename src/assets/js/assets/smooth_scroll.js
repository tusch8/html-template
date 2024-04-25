export default () => {

	const smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');
	const header = document.querySelector('.js-header');
	let href, target, rect, headerHeight, position;

	smoothScrollTriggers.forEach(trigger => {
		trigger.addEventListener('click', e => {
			e.preventDefault();

			href = trigger.getAttribute('href');

			// ページトップのとき
			if (href === "#top") {
				position = 0;

				// それ以外のページ内リンク
			} else {
				target = document.getElementById(href.replace('#', ''));
				rect = target.getBoundingClientRect().top;
				headerHeight = header.clientHeight;
				position = rect - headerHeight;
			}

			window.scrollTo({
				top: position,
				behavior: 'smooth',
			});
		});
	})

}
