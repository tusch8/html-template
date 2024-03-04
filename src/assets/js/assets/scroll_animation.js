export default () => {

	const targets = document.querySelectorAll('.js-anime'); // 監視対象
	const foundClass = "is-found"; // 画面内に入ったとき、アニメーションさせるアイテムにつけるクラス
	const body = document.body;

	if (!targets.length || body.classList.contains('is-found')) {
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
				if (entry.target.dataset.anime) {
					entry.target.classList.add(foundClass);
				}

				// 違う場合は、data-anime属性がある子要素をアニメーションさせる
				else {
					const children = entry.target.querySelectorAll('[data-anime]');
					Object.keys(children).forEach((key) => {
						children[key].classList.add(foundClass);
					});
				}
				observer.unobserve(entry.target);
			}
		});
	}, options);

	targets.forEach(target => {
		observer.observe(target);
	});

	// 実行済みか判定するためにbodyにクラスつける
	body.classList.add('is-found');
}
