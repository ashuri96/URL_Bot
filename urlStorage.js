// urlStorage.js
const urlMap = new Map();

module.exports = {
	setUrl(name, url) {
		urlMap.set(name, url); // 上書きも可
	},
	getUrl(name) {
		return urlMap.get(name);
	},
	hasUrl(name) {
		return urlMap.has(name);
	},
	getAllUrls() {
		return [...urlMap.entries()];
	},
};
