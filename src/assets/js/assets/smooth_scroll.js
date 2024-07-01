export default () => {

	const triggers = document.querySelectorAll('a[href^="#"]');
	const header = document.getElementById('header');
	let href, target, rect, headerHeight, position;

	triggers.forEach(trigger => {
		trigger.addEventListener('click', e => {
			e.preventDefault();
			href = trigger.getAttribute('href');

			// ページトップのとき
			if (href === "#top") {
				position = 0;
			}

			// それ以外のページ内リンク
			else {
				target = document.getElementById(href.replace('#', ''));
				rect = target.getBoundingClientRect().top + window.scrollY;

				// 追従ヘッダーの場合ヘッダーの高さを引く
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
