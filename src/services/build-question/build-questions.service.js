import { QuestionFactory } from "../question-factory/question-factory.service.js";
import { QuestionCommander } from "../questions/question.service.js";

export class BuildQuestionsFacade {
  static async buildQuestions() {
    const questionCommander = new QuestionCommander();
    questionCommander.addQuestion(
      "default",
      QuestionFactory.createQuestion("default")
    );
    questionCommander.addQuestion(
      "Exit",
      QuestionFactory.createQuestion("exit")
    );
    questionCommander.addQuestion(
      "Get Coupons",
      QuestionFactory.createQuestion("getCoupons")
    );
    questionCommander.addQuestion(
      "Calculate Delivery Cost",
      QuestionFactory.createQuestion("getDeliveryCost")
    );

    questionCommander.addQuestion(
      "Get Package Detail",
      QuestionFactory.createQuestion("getPackageDetail")
    );

    questionCommander.addQuestion(
      "Add New Coupon",
      QuestionFactory.createQuestion("addCoupon")
    );

    await questionCommander.runCLIQuestion("default");
  }
}
