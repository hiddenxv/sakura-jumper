var getAsin = (url) => {
	if (!url.startsWith('https://www.amazon.co.jp/')) {
		return null;
	}

	const elements = url.split('/');
	let index = elements.indexOf('dp');
	if (index < 0) {
		index = elements.indexOf('product');
		if (index < 0) {
			return null;
		}
	}

	if (elements.length > index) {
		return elements[index + 1].slice(0, 10);
	} else {
		return null;
	}
};

var openSakura = () => {
	chrome.tabs.getSelected((tab) => {
		const asin = getAsin(tab.url);
		if (asin) {
			const sakuraUrl = `https://sakura-checker.jp/search/${asin}/`;
			window.open(sakuraUrl, 'sakuraChecker');
		}
	});
};

var updateIcon = (tabID) => {
	chrome.tabs.getSelected((tab) => {
		const asin = getAsin(tab.url);
		if (asin) {
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
};

chrome.tabs.onSelectionChanged.addListener(updateIcon);
chrome.browserAction.onClicked.addListener(openSakura);
