import inquirer from "inquirer";

class CLIServiceSingleton {
  constructor() {
    if (!CLIServiceSingleton.instance) {
      CLIServiceSingleton.instance = this;
      this.inquirerTypeFunction = null;
    }
    return CLIServiceSingleton.instance;
  }

  async prompt(options) {
    return await inquirer.prompt(options);
  }
}

export default new CLIServiceSingleton();
