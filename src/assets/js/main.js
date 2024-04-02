import { LoadingSet, LoadingHide } from './assets/loading.js';
import Nav from './assets/nav.js';
import Pagetop from './assets/pagetop.js';

import Home from './scenes/home.js';

// bodyのid
const bodyId = document.body.getAttribute('id');

// DOM読み込み後
const DomLoad = () => {
	LoadingSet();

	// ページの読み込みが遅すぎるときの最大時間
	setTimeout(() => {
		LoadingHide();
	}, 5000);
};

// ページ読み込み後
const PageLoaded = () => {
	LoadingHide();
	Nav();
	Pagetop();

	// ページ別のJSを実行
	switch (bodyId) {
		case 'home':
			Home();
			break;
	}
}

// イベント宣言
if (document.readyState !== 'loading') {
	DomLoad();
} else {
	document.addEventListener('DOMContentLoaded', DomLoad, false);
}
window.addEventListener('load', PageLoaded, false);
