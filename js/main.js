var getItemID = (url) => {
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
		return elements[index + 1].split('?')[0];
	} else {
		return null;
	}
};

var openSakura = () => {
	chrome.tabs.getSelected((tab) => {
		const itemID = getItemID(tab.url);
		if (itemID) {
			const sakuraUrl = `https://sakura-checker.jp/search/${itemID}/`;
			window.open(sakuraUrl, 'sakuraChecker');
		}
	});
};

var updateIcon = (tabID) => {
	chrome.tabs.getSelected((tab) => {
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
};

chrome.tabs.onSelectionChanged.addListener(updateIcon);
chrome.browserAction.onClicked.addListener(openSakura);
