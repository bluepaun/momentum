const gameform = document.querySelector("form");
const resultPage = document.querySelector(".resultSection");

function displayResult(result, answer, user) {
  const span = resultPage.querySelector("span");
  const h2 = resultPage.querySelector("h2");
  span.innerText = `You chose: ${user}, the machine chose: ${answer}`;
  h2.innerText = result ? "You won!" : "You lost";
}

function playGame(machineMax, user) {
  const answer = Math.floor(Math.random() * (machineMax + 1));

  displayResult(answer === user, answer, user);
}

gameform.addEventListener("submit", (event) => {
  event.preventDefault();
  const machineInput = gameform.querySelector("#machine");
  const userInput = gameform.querySelector("#user");
  const machineMax = parseInt(machineInput.value, 10);
  const userAnswer = parseInt(userInput.value, 10);
  if (userAnswer > machineMax) {
    return false;
  }
  playGame(machineMax, userAnswer);
});
