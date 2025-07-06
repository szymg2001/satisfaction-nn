const tf = require("@tensorflow/tfjs");
import settings, { allowedWeatherValues, ServiceInput } from "../settings";
import { categories, categoryDetailed } from "./data";
import getExpectedScore from "./functions/GetExpectedScore";
import normalizeInput from "./functions/NormalizeInput";

export async function trainModel(model: any) {
  const trainInputData = Array(settings.numberOfTrainingData)
    .fill(null)
    .map(
      (): ServiceInput => ({
        distance: Math.random() * settings.maxDistance,
        rating: Math.random() * settings.maxRate,
        hour: new Date().getHours(),
        weather:
          allowedWeatherValues[
            Math.floor(Math.random() * allowedWeatherValues.length)
          ],
        category:
          categories[
            Math.floor(Math.random() * Object.keys(categoryDetailed).length)
          ],
        categoryLikedBefore: (Math.floor(Math.random() * 3) - 1) as -1 | 0 | 1,
        isOpen: Math.random() < 0.5,
      })
    );
  /* const trainInputData = Array(settings.numberOfTrainingData)
    .fill(null)
    .map((): number[] => [
      Math.random() * settings.maxDistance,
      Math.random() * settings.maxRate,
      Math.random() < 0.5 ? 1 : 0,
      Math.floor(Math.random() * Object.keys(categoryDetailed).length),
      Math.floor(Math.random() * allowedWeatherValues.length),
      new Date().getHours(),
      Math.floor(Math.random() * 3) - 1,
    ]); */
  const normalizedData = trainInputData.map(normalizeInput);

  const trainExpectedData = normalizedData.map(getExpectedScore);

  const xs = tf.tensor2d(normalizedData);
  const ys = tf.tensor2d(trainExpectedData);

  await model.fit(xs, ys, {
    epochs: settings.epochs,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        if ((epoch + 1) % 50 === 0) {
          console.log(`Epoka ${epoch + 1} - Loss: ${logs.loss.toFixed(4)}`);
        }
      },
      onTrainEnd: () => {
        console.log("✅ Finished training");
      },
    },
  });
}
