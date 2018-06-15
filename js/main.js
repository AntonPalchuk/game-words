var arr = [
  {
    value:"apple",
    description: "A fruit, sweet inside, rich in vitamins A and B1",
    prompts: ["Grows on trees,there is a green, yellow, red color"]
  },
  {
    value:"beaver",
    description: "Animal, lives in the forest, has a powerful tail",
    prompts: ["Very loves of wood"]
  },
  {
    value:"water",
    description: "Has three states, a very important part of our world",
    prompts: ["Уou drink it every day"]
  }
]

function shuffleArr(arr) {
  var cloneArr = arr.slice(0);
  var j,x,i;
  for (i = cloneArr.length - 1; i > 0; i--) {
       j = Math.floor(Math.random() * (i + 1));
       x = cloneArr[i];
       cloneArr[i] = cloneArr[j];
       cloneArr[j] = x;
   }

  return cloneArr;
}

function Word(word,i) {
  this.value = word.value;
  this.description = word.description;
  this.prompts = word.prompts;
  this.id = i;
}

function User(name){
  this.name = name;
  this.score = 1000;
}

function Game(user,words) {
  this.user = user;
  this.words = shuffleArr(words).map(function(el,i) {
    return new Word(el,i)
  });
  this.currentIndex = 0;
  this.wordsLogs = {
    // "16167e784af":{
    //   prompts: 0,
    //   lettersOpened: ["v","s","r"],
    //   attempts: ["ghfgh","ffhfth"]
    // }
  };
  this.drawer = new Drawer(this.user)
}


Game.prototype.initialise = function () {
  console.log(this.drawer);
  this.drawer.drawAll(this.words[this.currentIndex]);

}

Game.prototype.newGame = function () {
  user.score = user.score - user.score;
  user.score = user.score + 1000;
  this.drawer.drawScore();
  this.drawer.drawAll(this.words[this.currentIndex]);
}

Game.prototype.nextWord = function () {
    this.currentIndex = this.currentIndex + 1;
    user.score = user.score + 1000;
    this.drawer.drawScore();
    this.drawer.drawAll(this.words[this.currentIndex]);
}

Game.prototype.youWin = function() {
  var divEnd = document.createElement("div");
  // divEnd.classList.add("styleLost")
  divEnd.innerText = "Сongratulations " + user.name + ", you won!You scored " + user.score + " points"
  document.body.appendChild(divEnd);
}

Game.prototype.youLost = function () {
  var lost = document.createElement("div");
  lost.classList.add("styleLost");
  lost.classList.add("slideLost");
  document.body.appendChild(lost);
  function text() {
    lost.innerText = "You lost";
    function disappear() {
      lost.innerText = "";
      lost.classList.remove("styleLost");
      lost.classList.remove("slideLost");
    }
    setTimeout(disappear,600);
    game.newGame();
  }
  setTimeout(text,2500);
}

Game.prototype.checked = function () {
  var check = document.getElementById("check");
    check.addEventListener("click",function(e) {
      e.preventDefault();
      var answerInput = document.getElementById("answerInput");
        if(answerInput.value === this.words[this.currentIndex].value){
          game.nextWord();
          answerInput.value = "";
        }else{
          if(user.score >= 500){
            answerInput.classList.add("slideLeftRight");
            user.score = user.score - 500;
            this.drawer.drawScore();
            answerInput.value = "";
            function func() {
              answerInput.classList.remove("slideLeftRight");
            }
            setTimeout(func, 500);
          }else{
            game.youLost();
            return false;
          }
        }
  }.bind(this))
}


function Drawer(user) {
  this.scoreEl = document.createElement("div");
  this.lettersEl = document.createElement("div");
  this.descriptionEl = document.createElement("div");
  this.scoreEl.classList.add("score");
  this.lettersEl.classList.add("letters");
  this.descriptionEl.classList.add("description");
  var gameScreen = document.getElementsByClassName("gameScreen")[0];
  gameScreen.appendChild(this.scoreEl);
  gameScreen.appendChild(this.descriptionEl);
  gameScreen.appendChild(this.lettersEl);

  this.user = user;
  var answerWrapper = document.createElement("div");
  answerWrapper.innerHTML = document.getElementById("answer").innerHTML;
  gameScreen.appendChild(answerWrapper);

  // this.prompts = prompts;
}

Drawer.prototype.drawAll = function (word) {
  if(word === undefined||word.description === undefined){
    game.youWin();
    return false;
  }
  this.drawLetters(word);
  this.drawScore();
  this.drawDescription(word.description);
}
Drawer.prototype.drawScore = function () {

  this.scoreEl.innerText = "Score " + this.user.score;
  this.scoreEl.classList.add("style");

}
Drawer.prototype.drawLetters = function (word) {
  this.lettersEl.innerHTML = "";
  for(var i = 0;i < word.value.length;i++){
    var divMain = document.createElement("div");
    var divLetter = document.createElement("div");
    divLetter.classList.add("letter")
    divLetter.innerText = word.value[i].toUpperCase();
    divMain.classList.add("divMain");
    divMain.appendChild(divLetter);
    this.lettersEl.appendChild(divMain);
    divLetter.addEventListener("click",function (e) {
      if(user.score >= 350){
      e.currentTarget.classList.remove("letter");
      e.currentTarget.classList.add("letterAnimation");
      e.currentTarget.style.fontSize = 36 + "px";
      this.user.score = this.user.score - 350;
      this.drawScore();
    }else{
      return false;
    }
    }.bind(this))
  }
  this.lettersEl.classList.add("style");

}
Drawer.prototype.drawDescription = function (text) {
  this.descriptionEl.innerText = text;
  this.descriptionEl.classList.add("style");
}

var input = document.getElementById("input");

var start = document.getElementById("start");
start.addEventListener("click",function(e) {
  e.preventDefault();
  var welcome = document.getElementsByClassName("welcome")[0];
      gameScreen = document.getElementsByClassName("gameScreen")[0],
      user = new User(input.value),
      game = new Game(user,arr),
  welcome.classList.add("none");
  gameScreen.classList.remove("gameScreen");
  game.initialise();
  game.checked();

  console.log(game);
})
