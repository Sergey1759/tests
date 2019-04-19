var sel_but = document.getElementById('sel_but');
var conteiner = document.getElementById('conteiner');
var but_On = false;

sel_but.onclick = function(){
    var form = document.getElementsByClassName('myForm');
    var menu = document.getElementsByName('menu');
    clear(conteiner,form);
    console.log(1);
    if(but_On != false){
      var save = confirm("Вы - администратор?");
      if(save){
        for (var i=0;i<menu.length; i++) {
          if (menu[i].checked) {
             Request(menu[i].id, Mycallback);
          }
        }
         but_On = true;
      }
    } else{
      for (var i=0;i<menu.length; i++) {
        if (menu[i].checked) {
           Request(menu[i].id, Mycallback);
        }
      }
       but_On = true;
    }
    
}

function Mycallback(param){
    var Array = getArray(param);
    //console.log(Array);
    DOM_Add_html(Array);
    
}

function DOM_Add_html(arr){ 
    for(var i = 0; i < arr.length; i++){
        var form = document.createElement('form');
        form.id = arr[i].id;
        form.classList.add('myForm');
        var h3 = '<h3>' + arr[i].questions + '</h3>'
        var radio = "";
        for(var j = 0; j < arr[i].answer.length; j++){
            radio = radio + `
        <label class="container"> ${arr[i].answer[j].answe}
        <input type="radio"  name="radio">
        <span class="checkmark"></span>
        </label>
        `;
            console.log(arr[i].answer[j].answe);
        }
        form.innerHTML = h3 + radio;
        conteiner.appendChild(form);
    }
}

function getArray(param){
    var target = "-q-"; // цель поиска
    var questions = [];
    var pos = qPosition(param, target, -1);
    
    while (pos != -1) {
        questions.push(param.slice(pos, qPosition(param, target, pos)));
        pos = qPosition(param, target, pos);        
    }

    var answ = [];
    var count_answer = 0; 
    
    for(var i = 0; i < questions.length; i++){
      pos = qPosition(questions[i], '-v-', -1);
      var t = qPosition(questions[i], '-t-', pos);

      answ[i] = { questions : '',answer : [], right : -1, id : i};

      answ[i].questions = questions[i].slice(0 + 3, qPosition(questions[i], '-v-', pos - 1));
    
      while (pos != -1) {
          answ[i].answer.push({answe : questions[i].slice(pos + 3, qPosition(questions[i], '-v-', pos)), id : count_answer++});
          pos = qPosition(questions[i], '-v-', pos);        
      }
      for(var j = 0; j < answ[i].answer.length; j++){
         
        var t = answ[i].answer[j].answe.indexOf('-t-')
        if(t != -1) { 
          answ[i].answer[j].answe = answ[i].answer[j].answe.slice(t + 3);
          answ[i].right = answ[i].answer[j].id;
        }
      }
    
    }
    function qPosition(txt, target, prevPosition){  return txt.indexOf(target, prevPosition + 1); }
        return answ;
    }

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
    
}

function clear(Parent_elem,elem){
    for(var i = 0; i < elem.length; i++){
      Parent_elem.removeChild(elem[i]);
    }
}
