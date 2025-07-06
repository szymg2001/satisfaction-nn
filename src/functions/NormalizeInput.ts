import settings, { allowedWeatherValues, ServiceInput } from "../../settings";
import { Category, categoryDetailed } from "../data";

const categories = Object.keys(
  categoryDetailed
) as (keyof typeof categoryDetailed)[];

export default function normalizeInput({
  distance,
  rating,
  isOpen,
  category,
  weather,
  hour,
  categoryLikedBefore,
}: ServiceInput) {
  const nDistance = distance / settings.maxDistance;
  const nRating = rating / 5;
  const nHour = hour / 24;
  const nLiked =
    categoryLikedBefore === -1 ? 0 : categoryLikedBefore === 0 ? 0.5 : 1;

  const categoryTyped = category as Category;

  const categoryIndex = categories.indexOf(categoryTyped);
  const categoryOneHot = Array(Object.keys(categoryDetailed).length).fill(0);
  categoryOneHot[categoryIndex] = 1;

  const weatherIndex = allowedWeatherValues.indexOf(weather);
  const weatherOneHot = Array(allowedWeatherValues.length).fill(0);
  weatherOneHot[weatherIndex] = 1;

  return [
    nDistance,
    nRating,
    isOpen,
    nHour,
    nLiked,
    ...categoryOneHot,
    ...weatherOneHot,
  ];
}
