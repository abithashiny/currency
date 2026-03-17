const { exec } = require("child_process");
const path = require("path");

const generateMLPrediction = (from, to) => {
  return new Promise((resolve, reject) => {

    const script = path.join(__dirname, "../../currency-ml/predict.py");

    exec(`python "${script}" ${from} ${to}`, (error, stdout) => {

      if (error) return reject(error);

      const data = JSON.parse(stdout);
      resolve(data);

    });

  });
};

module.exports = { generateMLPrediction };