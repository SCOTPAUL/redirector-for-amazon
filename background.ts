browser.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg == "showAction") {
        browser.pageAction.show(sender.tab.id);
        sendResponse({tab: sender.tab.id});
    }
});

