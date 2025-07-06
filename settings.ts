import { z } from "zod";
import { categoryDetailed } from "./src/data";
export const allowedWeatherValues = ["sunny", "rain", "snow"] as const;

export default {
  //Model
  firstLayerUnits: 16,
  secondLayerUnits: 16,
  learningRate: 0.01,
  inputParameters:
    7 +
    Object.keys(categoryDetailed).length -
    1 +
    allowedWeatherValues.length -
    1,

  //Training
  maxDistance: 15000,
  maxRate: 5,
  numberOfTrainingData: 1000,
  epochs: 200,

  //Weights
  weather: 35,
  rate: 40,
  liked: 25,
  hour: 25,
  open: 50,
  distance: 30,
};

export const ServiceInputData = z.object({
  distance: z.number(),
  rating: z.number(),
  isOpen: z.boolean(),
  weather: z.enum(allowedWeatherValues),
  category: z.string(),
  hour: z.number(), //set min date to today?????
  categoryLikedBefore: z.union([z.literal(-1), z.literal(0), z.literal(1)]),
});

export type ServiceInput = z.infer<typeof ServiceInputData>;
export const ServiceInputArray = z.array(ServiceInputData);
