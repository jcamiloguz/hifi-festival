import { getEl, getEls } from "../global.js";
import { questionItem, sliderItem, userScore } from "../templates/front.js";

import { Trivia } from "../class/trivia.js";
import { getArtists } from "../class/artist.js";

const artistList = getEl(".Section__slider--artists");
const inputName = getEl(".Form__intput--trivia");
const buttonStartTrivia = getEl(".Trivia--button");
const startTriviaContainer = getEl(".Trivia__start");
const questionTriviaContainer = getEl(".Trivia__question");
const congratulationTriviaContainer = getEl(".Trivia__congratulation");
const failedTriviaContainer = getEl(".Trivia__failed");
const retryButton = Array.from(getEls(".Retry--button"));
const ranksButtonFailed = getEl(" .Ranks--button--failed");
const ranksButtonCongrat = getEl(" .Ranks--button--congrat");
const ranksContainer = getEl(".Rankings__container");
const ranksList = getEl(".Ranks__container");
const tittleProgressBar = getEl(".tittleProgressBar");
const progressBar = getEl(".progress__trivia");
const progressLabel = getEl(".progress__label--number");
const codeContainer = getEl(".Code__container");
const tooltip = getEl("#myTooltip");
const artists = getArtists();
const renderArtist = () => {
  artistList.innerHTML = artists
    .slice(0, 5)
    .map((artist) => sliderItem(artist))
    .join("");
};

const startTrivia = (e) => {
  e.preventDefault();
  if (inputName.value === "") {
    alert("Please enter your name");
    return;
  }
  const trivia = new Trivia(inputName.value);
  const questions = trivia.getQuestions();

  startTriviaContainer.classList.add("hidden");
  tittleProgressBar.classList.remove("hidden");
  progressBar.classList.remove("hidden");
  questionTriviaContainer.classList.remove("hidden");
  renderQuestions(trivia);
};

const renderQuestions = (trivia) => {
  questionTriviaContainer.innerHTML = questionItem(
    trivia.questions[trivia.score]
  );
  progressBar.value = trivia.score + 1;
  progressLabel.innerHTML = trivia.score + 1;

  const answers = Array.from(getEls(".Answer__container "));

  answers.map((answer) => {
    answer.addEventListener("click", (answerElement) => {
      answerElement.preventDefault();
      const isTrue = answerElement.target.attributes["answer"].value;
      if (isTrue === "true") {
        trivia.score++;
        answerElement.target.classList.add("Answer--correct");
        console.log(trivia.score);
        setTimeout(() => {
          if (trivia.score === trivia.questions.length) {
            trivia.saveScore({ name: trivia.name, score: trivia.score });
            renderCongratulations(trivia);
          } else {
            renderQuestions(trivia);
          }
        }, 1000);
      } else {
        answerElement.target.classList.add("Answer--incorrect");
        trivia.saveScore({ name: trivia.name, score: trivia.score });
        ranksButtonFailed.addEventListener("click", () => {
          renderRanklist(trivia);
        });
        const wait = () => {
          renderFailed();
        };
        setTimeout(wait, 1000);
      }
    });
  });
};
retryButton.map((btn) => {
  btn.addEventListener("click", () => location.reload());
});
codeContainer.addEventListener("click", () => {
  navigator.clipboard.writeText("BEST10");

  /* Alert the copied text */

  tooltip.innerHTML = "Copied: BEST10";
});
codeContainer.addEventListener("mouseout", () => {
  tooltip.innerHTML = "Copy to clipboard";
});
const renderCongratulations = (trivia) => {
  congratulationTriviaContainer.classList.remove("hidden");
  questionTriviaContainer.classList.add("hidden");
  tittleProgressBar.classList.add("hidden");
  progressBar.classList.add("hidden");
  ranksButtonCongrat.addEventListener("click", () => {
    renderRanklist(trivia);
  });
};

const renderFailed = () => {
  questionTriviaContainer.classList.add("hidden");
  failedTriviaContainer.classList.remove("hidden");
  tittleProgressBar.classList.add("hidden");
  progressBar.classList.add("hidden");
};

const renderRanklist = (trivia) => {
  console.log("da");
  congratulationTriviaContainer.classList.add("hidden");
  failedTriviaContainer.classList.add("hidden");
  tittleProgressBar.classList.add("hidden");
  progressBar.classList.add("hidden");
  ranksContainer.classList.remove("hidden");
  ranksList.innerHTML = trivia.getHighScore().map((item) => {
    return userScore(item.name, item.score);
  });
};

renderArtist();
buttonStartTrivia.addEventListener("click", (e) => startTrivia(e));
