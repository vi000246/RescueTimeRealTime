var currentDomain;

//trigger when switch tab
chrome.tabs.onActivated.addListener(function(activeInfo) {

    chrome.tabs.get(activeInfo.tabId, SetCurrentDomain);
    DisplayUsedTimeOnIcon();
});
//trigger when url change
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.url){
        var changedUrl = GetCurrentDomainByUrl(changeInfo.url);
        //console.log('old:'+currentDomain +' new:'+changedUrl);
        //if domain is changed.
        if(changedUrl !== currentDomain)
        {
            currentDomain = changedUrl;
            DisplayUsedTimeOnIcon();
        }
    }
});
//excute every 5 minute
setInterval(function(){ DisplayUsedTimeOnIcon; }, 300000);



function DisplayUsedTimeOnIcon(){
    getAPIkey(function(item){
        GetDataFromRescueTime(item.apikey).then(data => {
            console.log(data);
            if(data && !data.error){
                var timeUsed = GetUsedTimeByDomain(data,currentDomain);
                chrome.browserAction.setBadgeBackgroundColor({
                    color: 'blue'
                  });
                chrome.browserAction.setBadgeText({text: timeUsed.toString()+'m'});
            }else{
                chrome.browserAction.setBadgeBackgroundColor({
                    color: 'red'
                  });
                chrome.browserAction.setBadgeText({text: '！'});
            }
        }).catch(reason => console.log(reason.message));
    });

}

function SetCurrentDomain(tab) {
    var url = tab.url
    currentDomain = GetCurrentDomainByUrl(url);
    
}

function GetCurrentDomainByUrl(url){
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
    }
    return result
}