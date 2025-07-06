const tf = require("@tensorflow/tfjs");
const express = require("express");
const app = express();
const port = 3333;

app.use(express.json());
let modelTrained = false;

import settings, { ServiceInputArray, ServiceInputData } from "../settings";
import { inputArrayErrorMessage, inputErrorMessage } from "./errors";
import getExpectedScore from "./functions/GetExpectedScore";
import normalizeInput from "./functions/NormalizeInput";
import { trainModel } from "./train";

//Model initialization
const model = tf.sequential();
model.add(
  tf.layers.dense({
    units: settings.firstLayerUnits,
    activation: "relu",
    inputShape: [settings.inputParameters],
  })
);
model.add(
  tf.layers.dense({ units: settings.secondLayerUnits, activation: "relu" })
);
model.add(tf.layers.dense({ units: 1 }));
model.compile({ optimizer: tf.train.adam(0.01), loss: "meanSquaredError" });

//////////////////////////////////////

async function prediction(data: any[][]) {
  const inputTensor = tf.tensor2d(data);
  const prediction = model.predict(inputTensor);

  return await prediction.array();
}

//////////////////////////////////////

app.post("/predict", async (req, res) => {
  if (!modelTrained) {
    console.log("Model not trained yet.");
    return res.send("Model not trained yet.");
  }

  const validate = ServiceInputData.safeParse(req.body);
  if (!validate.success) {
    return res
      .status(400)
      .send(inputErrorMessage + `\n\nError: \n ${validate.error.message}`);
  }

  let predictData = [normalizeInput(req.body)];
  const predictionResult = await prediction(predictData);
  res.send(predictionResult);
});

//////////////////////////////////////
app.post("/predictArray", async (req, res) => {
  if (!modelTrained) {
    console.log("Model not trained yet.");
    return res.send("Model not trained yet.");
  }

  const validate = ServiceInputArray.safeParse(req.body);
  if (!validate.success) {
    return res.status(400).send(inputArrayErrorMessage);
  }

  let predictData = req.body.map((v) => normalizeInput(v));

  const predictionResult = await prediction(predictData);

  const scoredArray = predictData
    .map((_, i) => ({
      ...req.body[i],
      score: Math.floor(predictionResult[i][0]),
    }))
    .sort((a, b) => b.score - a.score);

  res.send(scoredArray);
});
//////////////////////////////////////

app.post("/score", async (req, res) => {
  const validate = ServiceInputData.safeParse(req.body);
  if (!validate.success) {
    return res.status(400).send(inputErrorMessage);
  }

  let scoreData = normalizeInput(req.body);
  let scoreResult = getExpectedScore(scoreData);

  res.send(scoreResult);
});

//////////////////////////////////////

app.post("/scoreArray", async (req, res) => {
  const validate = ServiceInputArray.safeParse(req.body);
  if (!validate.success) {
    return res.status(400).send(inputArrayErrorMessage);
  }

  let scoreData = req.body.map((v) => normalizeInput(v));
  let scoreResult = scoreData
    .map((v, i) => ({
      ...req.body[i],
      score: getExpectedScore(v)[0],
    }))
    .sort((a, b) => b.score - a.score);

  res.send(scoreResult);
});

//////////////////////////////////////
app.get("/train", async (req, res) => {
  await trainModel(model).then(() => {
    modelTrained = true;
    res.send("✅ Finished training");
  });
});

//////////////////////////////////////
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
