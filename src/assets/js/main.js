import Common from './assets/common.js';
import Loading from './assets/loading.js';
import Nav from './assets/nav.js';
import PageTop from './assets/pagetop.js';
import ScrollAnimation from './assets/scroll_animation.js';

import Home from './scenes/home.js';
import About from './scenes/about.js';

Common();
Nav();
PageTop();
ScrollAnimation();

// ページ別のJSを実行
const bodyId = document.body.getAttribute('id');

switch (bodyId) {
	case 'home':
		Loading();
		Home();
		break;
	case 'about':
		About();
		break;
}
