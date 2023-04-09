import chalk from "chalk";
import figlet from "figlet";
import {
  AddCoupon,
  Exit,
  GetAllCoupons,
  GetDeliveryCosts,
  GetPackageDetail,
  MenuQuestion,
  QuestionCommander,
} from "./src/services/questions/question.service.js";

async function buildQuestion() {
  const questionCommander = new QuestionCommander();
  questionCommander.addQuestion("default", new MenuQuestion());
  questionCommander.addQuestion("Exit", new Exit());
  questionCommander.addQuestion("Get Coupons", new GetAllCoupons());
  questionCommander.addQuestion(
    "Calculate Delivery Cost",
    new GetDeliveryCosts()
  );

  questionCommander.addQuestion("Get Package Detail", new GetPackageDetail());

  questionCommander.addQuestion("Add New Coupon", new AddCoupon());

  await questionCommander.runCLIQuestion("default");
}

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
  await buildQuestion();
}

setupWelcomeMessage();
runCLI();
