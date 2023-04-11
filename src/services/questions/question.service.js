export class QuestionCommander {
  constructor() {
    this.questions = {};
  }

  addQuestion(monitorQuestion, question) {
    this.questions[monitorQuestion] = question;
  }

  async runCLIQuestion(option) {
    let question = this.questions[option];
    if (question) {
      question.setOption(option);
      const answer = await question.execute();
      this.runCLIQuestion(answer);
    } else {
      this.runCLIQuestion("default");
    }
  }
}
