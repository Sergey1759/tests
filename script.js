var test = ['test1.txt','test2.txt']
var arrTest = [];
var count = 0;
var showT = false;
function Request(test, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) { 
            callback(request.responseText);
        } else {
          //bio.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
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
    var questions = [];
    var buf = -1;
    var pos = qPosition(arrTest[0], target, -1);

    var ArrayQue = [];
    
    while (pos != -1) {
        questions.push(arrTest[0].slice(pos, qPosition(arrTest[0], target, pos)));
        pos = qPosition(arrTest[0], target, pos);        
    }

    var answ = [];

    for(var i = 0; i < questions.length; i++){
      pos = qPosition(questions[i], '-v-', -1);
      var t = qPosition(questions[i], '-t-', pos);

      answ[i] = { questions : '',answer : [], true : '', id : i};

      answ[i].questions = questions[i].slice(0 + 3, qPosition(questions[i], '-v-', pos - 1));
      

      while (pos != -1) {
          answ[i].answer.push({answe : questions[i].slice(pos + 3, qPosition(questions[i], '-v-', pos)), vali : false});
          pos = qPosition(questions[i], '-v-', pos);        
      }
      for(var j = 0; j < answ[i].answer.length; j++){
         
        var t = answ[i].answer[j].answe.indexOf('-t-')
        if(t != -1) { 
          answ[i].answer[j].answe = answ[i].answer[j].answe.slice(t + 3);
          answ[i].answer[j].vali = true;
        }
      }
    }
    
    

    console.log(answ);
    
    function qPosition(txt, target, prevPosition){
        return txt.indexOf(target, prevPosition + 1);
    }
    

}






