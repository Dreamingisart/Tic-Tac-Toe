const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const playName = document.querySelectorAll(".player");
const btn = document.querySelector("#st-btn");
const name1 = document.querySelector(".name1");
const name2 = document.querySelector(".name2");
const backBox = document.querySelector(".Name");
const para = document.querySelectorAll(".playName p")

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

let input1 = document.querySelector(".one");
let input2 = document.querySelector(".two");

let ctr1 = 0;
let ctr2 = 0;

input1.addEventListener("input", () => {
  para[0].classList.remove("hidden")
  if (input1.value !== "") {
    para[0].innerText = `${input1.value} will play with O`;
  } else if (input1.value === "") {
    para[0].innerText = "Enter your name";
  }
});

input2.addEventListener("input", () => {
  para[1].classList.remove("hidden")
  if (input2.value !== "") {
    para[1].innerText = `${input2.value} will play with X`;
  } else if (input2.value === "") {
    para[1].innerText = "Enter opponent's name";
  }
});
  
input1.addEventListener("click" , () => {
  para[0].classList.remove("hidden")
  if (ctr1 < 1){
    input1.placeholder = ""
    ctr1 = ctr1 + 1;
  }
})

input2.addEventListener("click" , () => {
  para[1].classList.remove("hidden")
  if (ctr2 < 1){
    input2.placeholder = ""
    ctr2 = ctr2 + 1;
  }
})

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  intVal1 = input1.value;
  intVal2 = input2.value;
})

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);