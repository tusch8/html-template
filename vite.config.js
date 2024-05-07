import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import viteImagemin from 'vite-plugin-imagemin';
import fs from 'fs';
import path from 'path';

/**
 * サイトの共通情報
 */
const siteData = {
	siteName: 'Viteのベース',
	siteDesc: 'ディスクリプション',
	siteKwd: 'キーワード,キーワード',
	siteCanonical: 'https://xxx/',
}

/**
 * ページ別の情報
 */
const pageData = {
	'/index.html': {
		siteData: { ...siteData },
		path: '',
		isFront: true,
		pageSlug: 'index',
		pageTitle: 'トップページ',
		mainTxt: 'トップページです'
	},
	'/about/index.html': {
		siteData: { ...siteData },
		path: '../',
		isAbout: true,
		pageSlug: 'about',
		pageTitle: 'アバウトページ',
		mainTxt: 'アバウトページです'
	},
	'/about/child/index.html': {
		siteData: { ...siteData },
		path: '../../',
		isAboutChild: true,
		pageSlug: 'about-child',
		pageTitle: 'アバウトの子ページ',
		mainTxt: 'アバウトの子ページです',
		parentPageTitle: 'アバウトページ',
	},

};

/**
 * HTMLファイルの出力を自動化
 */
const files = [];
function readDirectory(dirPath) {
	const items = fs.readdirSync(dirPath);

	for (const item of items) {
		const itemPath = path.join(dirPath, item);

		if (fs.statSync(itemPath).isDirectory()) {
			// partsディレクトリを除外する
			if (item === 'parts') {
				continue;
			}

			readDirectory(itemPath);
		} else {
			// htmlファイル以外を除外する
			if (path.extname(itemPath) !== '.html') {
				continue;
			}

			// nameを決定する
			let name;
			if (dirPath === path.resolve(__dirname, 'src')) {
				name = path.parse(itemPath).name;
			} else {
				const relativePath = path.relative(path.resolve(__dirname, 'src'), dirPath);
				const dirName = relativePath.replace(/\//g, '_');
				name = `${dirName}_${path.parse(itemPath).name}`;
			}

			// pathを決定する
			const relativePath = path.relative(path.resolve(__dirname, 'src'), itemPath);
			const filePath = `/${relativePath}`;

			files.push({ name, path: filePath });
		}
	}
}
readDirectory(path.resolve(__dirname, 'src'));
const inputFiles = {};
for (let i = 0; i < files.length; i++) {
	const file = files[i];
	inputFiles[file.name] = resolve(__dirname, './src' + file.path);
}


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
						extType = 'images';
					}
					if (extType === 'images') {
						let assetPath = assetInfo.name; // フルパスを取得(vite3以下のみ有効かつMac限定？)
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
			input: inputFiles,
		},
		assetsInlineLimit: 0, // base64 URL としてインライン化しない
		minify: false,
	},
	plugins: [
		handlebars({
			// コンポーネントの格納ディレクトリ
			partialDirectory: resolve(__dirname, './src/parts'),
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
