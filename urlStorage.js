const userUrlData = new Map();

module.exports = {
	setUrl(userId, name, url) {
		if (!userUrlData.has(userId)) {
			userUrlData.set(userId, {});
		}
		const userUrls = userUrlData.get(userId);
		userUrls[name] = url;
	},

	getUrl(userId, name) {
		const userUrls = userUrlData.get(userId);
		return userUrls ? userUrls[name] : undefined;
	},

	hasUrl(userId, name) {
		const userUrls = userUrlData.get(userId);
		return userUrls ? name in userUrls : false;
	},

	getAllUrls(userId) {
		return userUrlData.has(userId) ? userUrlData.get(userId) : {};
	},

	userUrlData, // 他で共有したい場合
};
