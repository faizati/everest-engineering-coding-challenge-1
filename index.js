import chalk from "chalk";
import figlet from "figlet";
import CLIServiceSingleton from "./src/services/cli/cli.singleton.js";
import {
  Exit,
  GetAllCoupons,
  GetDeliveryCosts,
  GetPackageDetail,
  MenuQuestion,
  QuestionCommander,
} from "./src/services/questions/question.service.js";
const questionCommander = new QuestionCommander();
questionCommander.addQuestion("default", new MenuQuestion());
questionCommander.addQuestion("Exit", new Exit());
questionCommander.addQuestion("Get Coupons", new GetAllCoupons());
questionCommander.addQuestion(
  "Calculate Delivery Cost",
  new GetDeliveryCosts()
);
questionCommander.addQuestion("Get Package Detail", new GetPackageDetail());

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
  await questionCommander.runCLIQuestion("default");
}

setupWelcomeMessage();
runCLI();
