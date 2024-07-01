export default () => {

	const TARGET_SEL = '[data-anime]';
	const FOUND_CLASS = 'is-found';

	const targets = document.querySelectorAll(`${TARGET_SEL}`);

	if (!targets.length) {
		return;
	}

	const options = {
		root: null, // nullでビューポート
		rootMargin: "0px 0px -30% 0px", // 上右下左のrootからの距離 初期値は0px
		threshold: 0, // どれくらい交差したか 0～1
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {

				// 監視対象とアニメーションするアイテムが同じ場合
				if (entry.target.dataset.anime.trim() !== '') {
					entry.target.classList.add(FOUND_CLASS);
				}

				// 違う場合は、data-anime属性がある子要素をアニメーションさせる
				// 監視対象にする親要素のdata-animeの値は設定しない
				else {
					const children = entry.target.querySelectorAll(`${TARGET_SEL}`);
					Object.keys(children).forEach(key => {

						// 子要素の監視をやめる
						observer.unobserve(children[key]);

						// 子要素に同時にアニメーションさせる
						children[key].classList.add(FOUND_CLASS);
					});
				}
				// アニメーションを1度きりにする場合は以下のコメントアウト外す
				// observer.unobserve(entry.target);
			}

			// 画面外のとき、アニメーションをリセット
			// アニメーションを1度きりにする場合、以下のelse文はいらない
			else {
				if (entry.target.dataset.anime) {
					entry.target.classList.remove(FOUND_CLASS);
				} else {
					const founds = document.querySelectorAll(`${TARGET_SEL} .${FOUND_CLASS}`);
					founds.forEach(found => {
						found.classList.remove(FOUND_CLASS);
					})
				}
			}
		});
	}, options);

	targets.forEach(target => {
		observer.observe(target);
	});

	// 実行済みか判定するためにbodyにクラスつける
	document.body.classList.add('is-found');
}
