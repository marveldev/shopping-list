module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{svg,png,js,css,html,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};