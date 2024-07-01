export default () => {

	const container = document.querySelector('[data-nav-container]');
	const open = document.querySelector('[data-nav-open]');
	const close = document.querySelector('[data-nav-close]');

	const NAV_SEL = '[data-nav-list]';
	const nav = document.querySelector(`${NAV_SEL}`);

	// PCのナビ
	const pcNav = document.querySelector('[data-nav-pc]');

	const OPEN_CLASS = 'is-open';
	const CLOSE_CLASS = 'is-close';

	// PCはハンバーガーメニューではないとき、SPのナビをコピー
	const clonedNav = nav.cloneNode(true);
	pcNav.appendChild(clonedNav);

	// 開くボタンをクリックしたとき
	open.addEventListener('click', () => {
		openNav();
	});

	// 閉じるボタンをクリックしたとき
	close.addEventListener('click', () => {
		closeNav();
	});

	// 背景部分をクリック
	container.addEventListener('click', e => {
		if (!e.target.closest(NAV_SEL)) {
			closeNav();
		}
	});

	// ESCキーを押したとき
	container.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
			e.preventDefault();

			closeNav();
		}
	});


	// ナビを開く関数
	function openNav() {

		// ナビ表示前にクラスをつける(開くときのアニメーション開始)
		container.classList.add(OPEN_CLASS);

		// ナビを開く
		container.showModal();

		// ナビを開いた後にクラスをはずす
		requestAnimationFrame(() => {
			container.classList.remove(OPEN_CLASS)
		})
	}

	// ナビを閉じる関数
	function closeNav() {

		// ナビを閉じる前にクラスをつける(閉じるときのアニメーション開始)
		container.classList.add(CLOSE_CLASS);

		// アニメーション終了後にクラスを外してナビを閉じる
		// アニメーションが"transition"ではなく"animation"の場合は"animationend"にする
		container.addEventListener('transitionend', () => {
			container.classList.remove(CLOSE_CLASS);
			container.close();
		}, { once: true },
		)
	}


}
