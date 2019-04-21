//^\d{1,2}|100$ 
//При вимірах продуктивності необхідно враховувати такі моменти:
var sel_but = document.getElementById('sel_but');
var ver_but = document.getElementById('verify');
var chaked_all = document.getElementById('chaked_all');
var right_group = document.getElementById('right_group');
var group = document.getElementById('group');
var conteiner = document.getElementById('conteiner_form');
var but_On = false;
var finalArr;
var left = true;


chaked_all.onclick = function(){
    console.log(1);
    for (var i=0;i<document.getElementsByName('answer').length; i++) {
       document.getElementsByName('answer')[i].checked = true;
    }
}


//window.onscroll = function() {
//    if(left){
//        setTimeout(left_right_group(),100);
//    }
//}

sel_but.onclick = function(){
    var form = document.getElementsByClassName('myForm');
    var menu = document.getElementsByName('menu');
    
    left_right_group();
    
    if(but_On != false){
      var save = confirm("Ви впевнені що хочете змінити тест, всі відповіді не збережуться");
      if(save){
          clear(conteiner,form);
          Request(checked(menu), Mycallback);
      } 
    } else{
        Request(checked(menu), Mycallback);
        but_On = true;
    } 
}

right_group.onclick = function(){
   left_right_group();
}

function left_right_group(){
    if(group.className == ""){
        group.classList.add('goRight');
            setTimeout(function(){
                group.style.left = 0;
                left = true;
                right_group.style.backgroundImage = 'url(arrow-left.png)';
            },1000);
    }else if(group.className == "goLeft"){
        group.classList.remove("goLeft");
        group.classList.add("goRight");
            setTimeout(function(){
                group.style.left = 0;
                left = true;
                right_group.style.backgroundImage = 'url(arrow-left.png)';
            },1000); 
    } else if(group.className == "goRight"){
        group.classList.remove("goRight");
        group.classList.add("goLeft");
            setTimeout(function(){
                group.style.left = '-320px';
                left = false;
                right_group.style.backgroundImage = 'url(arrow-right.png)';
            },1000);
    }
}

ver_but.onclick = function(){
    var answer = document.getElementsByName('answer');
    var length = answer.length;
    var answers = checked(answer);
    var count_right_answer = 0;
    console.log(finalArr);
    if(answers.length < finalArr.length){
        var save = confirm(`ви відповіли на ${answers.length} питань з ${finalArr.length}. Ви впевнені що хочете перевірити свої знання?`);
        if(save) { count_right_answer = verifyDOM(answers)}; 
    } else if(answers.length == finalArr.length){
             count_right_answer = verifyDOM(answers);
    }
    alert(`ви відповіли правильно на ${count_right_answer} питань з ${answers.length}`)
}

function GetObjectByID(answerId){
    for(var j = 0; j < finalArr.length; j++){
        for(var k = 0; k < finalArr[j].answer.length; k++){
            if (finalArr[j].answer[k].id == answerId) return finalArr[j];
        }
    }
}

 function verifyDOM(answers){
     var count_right_answer = 0;
    for(var i = 0; i < answers.length; i++){
        var rightId = GetObjectByID(answers[i]).right; 
        console.log( GetObjectByID(answers[i]).right);
        var rightElem = document.getElementById(rightId).parentElement;
        var thisElem = document.getElementById(answers[i]).parentElement;
        if(rightId == answers[i]){
            count_right_answer++;
            if(thisElem.id != 'conteiner_form') thisElem.style.backgroundColor = '#6af885';
        } else {
            //console.log(rightElem);
            //console.log(thisElem);
            if(rightElem.id != 'conteiner_form') rightElem.style.backgroundColor = '#6af885';
            if(thisElem.id != 'conteiner_form') thisElem.style.backgroundColor = '#ffaaaa'; 
        }
    }
     return count_right_answer;
}

function Mycallback(param){
    var Array = getArray(param);
    finalArr = Array;
    DOM_Add_html(Array);
   
}

function checked(name){
    var arr = [];
    for (var i=0;i<name.length; i++) {
        if (name[i].checked) arr.push(name[i].id);
    } console.log(arr);
    if(name.length == 1){
        return arr[0];
    } else {
        return arr;
    }
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
<div class="custom-control custom-radio custom-control">
  <input type="radio" id=${arr[i].answer[j].id} name="answer" class="custom-control-input">
  <label class="custom-control-label" for=${arr[i].answer[j].id}>${arr[i].answer[j].answe}</label>
</div>
        `;
           // console.log(arr[i].answer[j].answe);
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

      answ[i] = { questions : '',answer : [], right : -1, id : i + 1000};

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
    for(var i = elem.length-1; i >= 0; i--){
      Parent_elem.removeChild(elem[i]);
    }
}



