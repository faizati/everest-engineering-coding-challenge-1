import chalk from "chalk";
import figlet from "figlet";
import { BuildQuestionsFacade } from "./src/services/build-question/build-questions.service.js";

function setupWelcomeMessage() {
  console.log(
    chalk.green(
      "Welcome to the app!",
      figlet.textSync("Kiki's Delivery", {
        horizontalLayout: "full",
        verticalLayout: "controlled smushing",
      })
    )
  );
}

async function runCLI() {
  await BuildQuestionsFacade.buildQuestions();
}

setupWelcomeMessage();
runCLI();
