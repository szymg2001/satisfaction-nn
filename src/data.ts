export type Category =
  | "Museum"
  | "Park"
  | "Monument"
  | "Attraction" // ogólna atrakcja (np. wesołe miasteczko)
  | "Nature" // jeziora, góry, lasy
  | "Shop" // galerie handlowe, etc
  | "Cinema"
  | "Restaurant"
  | "Cafe"
  | "Theatre"
  | "Event" // koncerty, festiwale
  | "HistoricSite";

type CategoryInfo = {
  location: "indoor" | "outdoor";
  type: "Culture" | "Nature" | "Leisure" | "Food" | "Shopping" | "Event";
};

export const categoryDetailed: Record<Category, CategoryInfo> = {
  Museum: { location: "indoor", type: "Culture" },
  Park: { location: "outdoor", type: "Nature" },
  Monument: { location: "outdoor", type: "Culture" },
  Attraction: { location: "outdoor", type: "Leisure" },
  Nature: { location: "outdoor", type: "Nature" },
  Shop: { location: "indoor", type: "Shopping" },
  Cinema: { location: "indoor", type: "Leisure" },
  Restaurant: { location: "indoor", type: "Food" },
  Cafe: { location: "indoor", type: "Food" },
  Theatre: { location: "indoor", type: "Culture" },
  Event: { location: "outdoor", type: "Event" },
  HistoricSite: { location: "outdoor", type: "Culture" },
} as const;

export function isWeatherSensitive(category: Category) {
  return categoryDetailed[category].location === "outdoor" ? true : false;
}

export const categories = Object.keys(
  categoryDetailed
) as (keyof typeof categoryDetailed)[];
//////////////////////////////////////////////////////////
