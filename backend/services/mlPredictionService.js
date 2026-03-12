const { exec } = require("child_process");
const path = require("path");

const generateMLPrediction = () => {
  return new Promise((resolve, reject) => {

    const script = path.join(__dirname, "../../currency-ml/predict.py");

    exec(`python "${script}"`, (error, stdout) => {

      if (error) {
        reject(error);
        return;
      }

      const data = JSON.parse(stdout);
      resolve(data);

    });

  });
};

module.exports = { generateMLPrediction };