import settings, { allowedWeatherValues } from "../../settings";
import { categoryDetailed, isWeatherSensitive } from "../data";

const categories = Object.keys(
  categoryDetailed
) as (keyof typeof categoryDetailed)[];

export default function getExpectedScore(normalized: number[]): [number] {
  const distance = normalized[0];
  const rate = normalized[1];
  const isOpen = normalized[2];
  const hour = normalized[3];
  const liked = normalized[4];

  //Category
  const categoryStart = 5;
  const categoryEnd = Object.keys(categoryDetailed).length + categoryStart;
  const categoryIndex = normalized
    .slice(categoryStart, categoryEnd)
    .findIndex((v) => v === 1);

  //Weather
  const weatherStart = categoryEnd;
  //const weatherEnd = allowedWeatherValues.length + weatherStart;
  const weatherIndex = normalized.slice(weatherStart).findIndex((v) => v === 1);

  //Compare weather and location category
  const category = categories[categoryIndex];
  const currentWeather = allowedWeatherValues[weatherIndex];
  const weatherOk =
    currentWeather !== "sunny" && isWeatherSensitive(category) ? -1.5 : 0.75;

  const openScore = !isOpen ? -settings.open : 0;

  return [
    openScore +
      weatherOk * settings.weather +
      rate * settings.rate +
      liked * settings.liked +
      1 * settings.hour -
      distance * settings.distance,
  ];
}
