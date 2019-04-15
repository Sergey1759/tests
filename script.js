var test = ['test1.txt','test2.txt']
var arrTest = [];
var count = 0;

function Request(test, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) { 
            callback(request.responseText);
        } else {
          bio.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
        } 
      }
    }
    request.open('Get', test);
    request.send();
    // console.log(arrTest[0]);
}
Request(test[0], Mycallback);
//Request(test[1], Mycallback);

function Mycallback(param){
    arrTest[count++] = param;
    var target = "-q-"; // цель поиска
    var arr = [];
    var count1 = 0;
    var buf = -1;
    var pos = -1;
    toArrObj();
    
    while ((pos = arrTest[0].indexOf(target, pos + 1)) != -1) {
    
    if(pos == 0) {
         arr[count1].start = 0;
     } else{
         arr[count1].finish = pos;
         count1++;
         arr[count1].start = pos;
     }

    }
    console.log(arr);
    console.log(arrTest[0].slice(arr[0].start,arr[0].finish));

    ////////////////////
    function toArrObj(){
        sum = 0;
        while ((pos = arrTest[0].indexOf(target, pos + 1)) != -1) { // arrTest[0] !!!!
        sum += 1;
        }
        for(var i = 0; i < sum; i++){
            arr[i] = {};
        }   
    }

}






