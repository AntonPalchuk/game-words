function arrObj(number) {;
  var arr = [
            {
              name:"apple",
              text: "A fruit, sweet inside, rich in vitamins A and B1",
              points: 1000,
              prompt: "Grows on trees,there is a green, yellow, red color"
            },
            {
              name:"beaver",
              text: "Animal, lives in the forest, has a powerful tail",
              points: 1000,

              prompt: "Very loves of wood"
            },
            {
              name:"water",
              text: "Has three states, a very important part of our world",
              points: 1000,

              prompt: "Уou drink it every day"
            }
            ]
              answers(arr[number]);
              drawNameAndPoint(arr[number]);
              drawText(arr[number]);
}

function getRandomWord() {
  return arr[random(0,arr.length)];
}

function getAllWords(){

}

function random(min,max) {
   var randomNumber = min + Math.round(Math.random() * (max - min));
   arrObj(randomNumber);
   return randomNumber;
}

function drawNameAndPoint(obj){

  var word = document.getElementById("word"),
      points = document.createElement("div");
      word.innerHTML = "";
      points.innerText = "You point " + "~~"+ obj.points + "~~";
      points.classList.add("points");
  for (var i = 0; i < obj.name.length; i++) {
    var divInner = document.createElement("div");
    divInner.innerText = obj.name[i].toUpperCase();
    divInner.classList.add("letters");
    divInner.classList.add("none");
    divInner.addEventListener("click",function (e) {
      drawNewPoint(obj);
      // var a = drawNewPoint(obj);
      // obj = a;
      // drawNameAndPoint(obj);
       drawWord(e);

    });

    word.appendChild(divInner);
    word.appendChild(points);
  }
}

function drawNewPoint(obj){
  console.log(obj);
  var length = obj.name.length;
  var pnt = 0;
  switch (length) {
    case 3:
      pnt = obj.points - 500;
      break;
    case 4:
      pnt = obj.points - 450;
      break;
    case 5:
      pnt = obj.points - 400;
      break;
    case 6:
      pnt = obj.points - 350;
      break;
    case 7:
      pnt = obj.points - 300;
      break;
    default:
    pnt = obj.points - 200;
  }
    var newObj = {
      name:"apple",
      text: "some fruite",
      points: pnt,
      nameLength: function(){
        return this.name.length;
      },
      prompt: "grouw on the tree"
    }
}

function drawWord(e){
  var openLetter = e.currentTarget;
 openLetter.classList.remove("none");
}

function drawText(obj){
  var text = document.getElementById("text");
  var prompt = document.getElementById("prompt");

      text.innerText = obj.text;
      text.classList.add("objText")
      prompt.addEventListener("click",function(){
        text.innerText = "";
        text.innerText = obj.text +"\n"+ obj.prompt;
      });
}

function answers(obj) {

  var answer = document.getElementById("input"),
      add = document.getElementById("add");
      add.addEventListener("click",function() {
        if(answer.value === obj.name){
          newGame();
          answer.value = "";
        }else{
          alert("no")
          answer.value = "";
        }
      })
}

function newGame(){
  var newG = document.getElementById("newGame");
  var hr = document.createElement("hr");
  var restart = document.createElement("button");
      restart.innerText = "Restart";
      restart.classList.add("restart");
      newG.classList.remove("dispNone");
      newG.innerText = "Congratulations you winner!" + "\n";
      newG.appendChild(hr);
      newG.appendChild(restart);
      restart.addEventListener("click",function() {
        random(0,2);
        newG.classList.add("dispNone");
      })

}

var start = document.getElementById("start");
    start.classList.add("start")
    start.addEventListener("click",function () {
      random(0,2);
    });
