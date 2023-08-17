import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import viteImagemin from 'vite-plugin-imagemin';

// サイトの共通情報
const siteData = {
	siteName: 'Viteのベース',
	siteDesc: 'ディスクリプション',
	siteKwd: 'キーワード,キーワード',
	siteCanonical: 'https://xxx/',
}

// HTML上で出し分けたい各ページごとの情報
const pageData = {

	'/index.html': {
		siteName: [siteData.siteName],
		siteDesc: [siteData.siteDesc],
		siteKwd: [siteData.siteKwd],
		siteCanonical: [siteData.siteCanonical],
		path: './',
		isHome: true,
		pageSlug: 'home',
		pageTitle: 'トップページ',
		mainTxt: 'トップページです'
	},
	'/about/index.html': {
		siteName: [siteData.siteName],
		siteDesc: [siteData.siteDesc],
		siteKwd: [siteData.siteKwd],
		siteCanonical: [siteData.siteCanonical],
		path: '../',
		isHome: false,
		pageSlug: 'about',
		pageTitle: 'アバウトページ',
		mainTxt: 'アバウトページです'
	},
	'/about/child/index.html': {
		siteName: [siteData.siteName],
		siteDesc: [siteData.siteDesc],
		siteKwd: [siteData.siteKwd],
		siteCanonical: [siteData.siteCanonical],
		path: '../../',
		isHome: false,
		pageSlug: 'about-child',
		pageTitle: 'アバウトの子ページ',
		mainTxt: 'アバウトの子ページです',
		parentPageTitle: 'アバウトページ',
	},

};

export default defineConfig({
	base: "./",
	root: './src', // 開発ディレクトリ設定
	build: {
		outDir: '../dist/', // 出力場所の指定
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.')[1];
					if (/png|jpe?g|svg|gif|tiff|bmp|ico|webmanifest/i.test(extType)) {
						extType = 'image';
					}
					if (extType === 'image') {
						let assetPath = assetInfo.name; // フルパスを取得
						let beginIndex = assetPath.indexOf('images/');
						let endIndex = assetPath.lastIndexOf('/');
						let imgDir = assetPath.substring(beginIndex, endIndex);
						return `assets/${imgDir}/[name][extname]`;
					}
					if (extType === 'css') {
						return `assets/${extType}/style.css`;
					}
					return `assets/${extType}/[name][extname]`;
				},
				chunkFileNames: 'assets/js/script.js',
				// entryFileNames: 'assets/js/script.js', // 下層あるときはコメントアウトする？
			},
			input: {
				home: resolve(__dirname, './src/index.html'),
				/*
					複数HTMLページを出力したい時にここへ追記していく
					xxx: resolve(__dirname, './src/xxx.html'),
				*/
				about: resolve(__dirname, './src/about/index.html'),
				aboutChild: resolve(__dirname, './src/about/child/index.html'),
			},
		},
		assetsInlineLimit: 0, // base64 URL としてインライン化しない
		minify: false,
	},
	plugins: [
		handlebars({
			// コンポーネントの格納ディレクトリ
			partialDirectory: resolve(__dirname, './src/inc'),
			context(pagePath) {
				return pageData[pagePath];
			},
		}),
		viteImagemin({
			pngquant: {
				quality: [0.8, 0.9],
				speed: 1, // 1～11
			},
			optipng: {
				optimizationLevel: 3, // 0～7
			},
			mozjpeg: {
				quality: 80, // 0～100
			},
			gifsicle: {
				optimizationLevel: 3, // 1～3
			},
			svgo: {},
			root: 'src/assets/images',
			verbose: true,
		}),
	],
});
