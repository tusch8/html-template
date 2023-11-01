import Common from './assets/common.js';
import { LoadingSet, LoadingHide } from './assets/loading.js';
import Nav from './assets/nav.js';
import PageTop from './assets/pagetop.js';
import ScrollAnimation from './assets/scroll_animation.js';

import Home from './scenes/home.js';
import About from './scenes/about.js';

Common();
Nav();
PageTop();
LoadingSet();

window.onload = () => {
	LoadingHide();
	ScrollAnimation();
}

// ページの読み込みが遅すぎるときの最大時間
setTimeout(() => {
	LoadingHide();
	ScrollAnimation();
}, 5000);

// ページ別のJSを実行
const bodyId = document.body.getAttribute('id');

switch (bodyId) {
	case 'home':
		Home();
		break;
	case 'about':
		About();
		break;
}
