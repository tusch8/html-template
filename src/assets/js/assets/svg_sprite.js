export default () => {

	const body = document.body;
	const svg = document.createElement('svg')
	svg.setAttribute('display', 'none');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg.innerHTML = `
			<defs>
				<symbol id="arrow01" viewBox="0 0 200 21.259">
					<path d="M186.376,273.726a3.077,3.077,0,0,0-2.094,5.419l11.066,9.683H9.692a3.078,3.078,0,1,0,0,6.155H203.539a3.077,3.077,0,0,0,2.026-5.392l-17.23-15.077a3.077,3.077,0,0,0-1.958-.788Z" transform="translate(-6.615 -273.724)" fill="currentColor" />
				</symbol>
			</defs>
		`;

	body.appendChild(svg);


	// const fetchData = url => {
	// 	return new Promise((resolve) => {
	// 		fetch(url)
	// 			.then(data => resolve(data))
	// 	});
	// }

	// const insertSvg = async () => {
	// 	const svg = await fetchData('../assets/images/common/sprite.svg');

	// 	const body = document.body;
	// 	body.prepend(svg);
	// }

	// insertSvg();

}
