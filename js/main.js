var openSakura = () => {
	// urlから商品IDを取得
	chrome.tabs.getSelected((tab) => {
		const itemID = getItemID(tab.url);
		if (itemID) {
			const sakuraUrl = `https://sakura-checker.jp/search/${itemID}/`;
			window.open(sakuraUrl, 'sakuraChecker');
		}
	});
};

var getItemID = (url) => {
	if (!url.startsWith('https://www.amazon.co.jp/')) {
		return null;
	}

	const elements = url.split('/');
	const dpIndex = elements.indexOf('dp');
	if (dpIndex >= 0 && elements.length > dpIndex) {
		return elements[dpIndex + 1];
	} else {
		return null;
	}
};

chrome.tabs.onSelectionChanged.addListener(function(tabId) {
	chrome.tabs.getSelected((tab) => {
		// alert(tab.url);
		const itemID = getItemID(tab.url);
		if (itemID) {
			chrome.browserAction.setIcon({
				path: "icons/icon_16.png",
				tabId: tab.id
			});
		} else {
			chrome.browserAction.setIcon({
				path: "icons/icon_disabled_16.png",
				tabId: tab.id
			});
		}
	});
});


(function () {
	if (chrome.browserAction) {
		chrome.browserAction.onClicked.addListener(openSakura);
	}

	if (chrome.tabs || true) {
		chrome.tabs.onActivated.addListener((info) => {
			console.log(info);
		});
	}
})();