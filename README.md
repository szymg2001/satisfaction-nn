    docker build -t satisfaction-nn .
    docker run -d -p 3333:3333 --name satisfaction-app satisfaction-nn

# How to use

Input format data:

       {
          "distance": 1590.09,               // number – dystans w metrach
          "rating": 4.6,                     // number – ocena (0–5)
          "isOpen": true,                    // boolean – czy lokalizacja jest otwarta
          "category": "Park",                // string – nazwa kategorii
          "weather": "sunny",                // "sunny" | "rain" | "snow"
          "hour": 15,                        // number – godzina (0–23)
          "categoryLikedBefore": -1         // -1: nie lubił, 0: brak info, 1: lubił
        }

## Train network

URL: http://localhost:3333/train

## With Neural Network

**URL**: http://localhost:3333/predictArray
**Body**: location[ ]
Returns location array with predicted satisfaction score.

---

**URL**: http://localhost:3333/predict
**Body**: location
Returns predicted satisfaction score for single location

## Without Neural Network

**URL**: http://localhost:3333/scoreArray
**Body**: location[ ]
Returns location array with fixed calculated satisfaction score.

---

**URL**: http://localhost:3333/score
**Body**: location
Returns calculated satisfaction score for single location
