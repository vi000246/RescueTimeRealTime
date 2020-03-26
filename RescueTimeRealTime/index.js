
displayKey();

document.getElementById("btnSave").addEventListener("click", SaveKey);
function SaveKey(){
  var key = document.getElementById("apikey").value;
  if(key){
    setAPIkey(key);
  }
  else{
    alert("Please input api key.");
  }
}

function displayKey(){
  getAPIkey(function(item){
    if(item.apikey){
      document.getElementById("apikey").value = item.apikey;
    }
  });
}
