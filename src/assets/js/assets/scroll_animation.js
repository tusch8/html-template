export default () => {

	const targets = document.querySelectorAll('.js-anime'); // 監視対象
	const foundClass = "is-found"; // 画面内に入ったとき、アニメーションさせるアイテムにつけるクラス

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
				// アニメーションを1度きりにする場合は以下のコメントアウト外す
				// observer.unobserve(entry.target);
			}

			// 画面外のとき、アニメーションをリセット
			// アニメーションを1度きりにする場合、以下のelse文はいらない
			else {
				if (entry.target.dataset.anime) {
					entry.target.classList.remove(foundClass);
				} else {
					const founds = document.querySelectorAll('.js-anime .' + foundClass);
					founds.forEach(found => {
						found.classList.remove(foundClass);
					})
				}
			}
		});
	}, options);

	targets.forEach(target => {
		observer.observe(target);
	});

	// テキストを1文字ずつspanで囲む関数
	const splitTextFunc = () => {
		const splitTexts = document.querySelectorAll('.js-split-text');

		if (!splitTexts.length) {
			return;
		}

		splitTexts.forEach(splitText => {
			const textArray = splitText.textContent.split(''); // 1文字ずつ配列にする
			const wrappedText = textArray.map(text => `<span>${text}</span>`).join(''); // spanで囲んで再度くっつける
			splitText.innerHTML = wrappedText; // 元のテキストをspanで囲んだテキストに置き換える
		})
	}
	splitTextFunc();
}
