import { readLocalStorage, writeLocalStorage } from "../global.js";

export class Trivia {
  constructor(name) {
    this.name = name;
    this.players = JSON.parse(readLocalStorage("players")) ?? [];
    this.score = 0;
    this.questions = [
      {
        question: "Is Mac Miller the greatest artist?",
        options: ["Yes", "No"],
        answer: "No",
      },
      {
        question:
          "The concert of the Travis Scott was the greatest concert of all time?",
        options: ["Yes", "No"],
        answer: "No",
      },
      {
        question: "Kanye has more grammys than Drake?",
        options: ["Yes", "No"],
        answer: "No",
      },
      {
        question: "Has ever been Taylor Swift in our festival?",
        options: ["Yes", "No"],
        answer: "Yes",
      },
      {
        question: "HiFi Festival is older than Tomorrowland?",
        options: ["True", "False"],
        answer: "False",
      },
      {
        question: "Drugs are legal in HiFi Festival ",
        options: ["Yes", "No", "Absolutely not"],
        answer: "Yes",
      },
      {
        question: "Avicii went to our festival?",
        options: ["Yes", "No"],
        answer: "No",
      },
      {
        question: "What is the name of the money in our festival?",
        options: ["LoCoins", "HiCoins", "BitCoints"],
        answer: "HiCoins",
      },
      {
        question: "Has HiFi Festival sold out?",
        options: ["Yes", "No"],
        answer: "Yes",
      },
      {
        question: "HiFi Festival supports Natalia Lafuercade?",
        options: ["Yes", "No"],
        answer: "Yes",
      },
    ];
  }

  getQuestions() {
    return shuffle(this.questions);
  }

  getQuestion(id) {
    return this.questions[id];
  }

  verifyAnswer(answer, id) {
    const question = this.getQuestion(id);
    return question.answer === answer;
  }

  getHighScore() {
    return this.players.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  saveScore() {
    this.players.push({ name: this.name, score: this.score });
    writeLocalStorage("players", JSON.stringify(this.players));
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
