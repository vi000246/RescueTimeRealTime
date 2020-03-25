
//return time used.(unit:minute)
function GetUsedTimeByDomain(rawData,domainName){
    var usedTime = 0
    var arrEachWebSite = rawData.rows;
    //console.log(arrEachWebSite);
    //console.log(domainName);
    var matchData = arrEachWebSite.filter(function( obj ) {return obj[3] == domainName;});
    //console.log(matchData);
    if(matchData.length > 0)
    {   //convert second to minute.
        usedTime = Math.round((matchData[0][1])/60)
    }
    return usedTime;
}

//format:JSON
async function GetDataFromRescueTime(apiKey){
    let response = await fetch('https://www.rescuetime.com/anapi/data?key='+apiKey+'&format=json').then(function (response) {
        return response.json();
    }).catch(function (err) {
        console.warn('Could not load data from api current API key:'+apiKey);
        return '';
    });
    return response;
}

function validAPIkey(){

}

function getAPIkey(callback){
    chrome.storage.sync.get(["apikey"],callback);
}

function setAPIkey(key){
    chrome.storage.sync.set({ "apikey": key }, function(){
        alert("Save success!");
    });
}