var openSakura = () => {
	// urlから商品IDを取得
	chrome.tabs.getSelected((tab) => {
		if (tab.url.startsWith('https://www.amazon.co.jp/')) {
			const itemID = getItemID(tab.url);
			if (itemID) {
				const sakuraUrl = `https://sakura-checker.jp/search/${itemID}/`;
				window.open(sakuraUrl, 'sakuraChecker');
			}
		}
	});
};

var getItemID = (url) => {
	const elements = url.split('/');
	const dpIndex = elements.indexOf('dp');
	if (dpIndex >= 0 && elements.length > dpIndex) {
		return elements[dpIndex + 1];
	} else {
		return null;
	}
};

(function () {
	chrome.browserAction.onClicked.addListener(openSakura);
})();