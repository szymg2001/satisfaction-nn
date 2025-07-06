export const inputErrorMessage = `
Incorrect input data format

Required format:
{
    distance: number            // 1590.09
    rating: number              // 4.6
    isOpen: boolean             // true / false
    category: string            // "Park"
    weather: string             // "sunny" | "rain" | "snow"
    hour: number                // timestamp
    categoryLikedBefore: number // -1: no, 0: no info, 1: yes
}
`;

export const inputArrayErrorMessage = `
Incorrect input data format

Required format:
[{
    distance: number            // 1590.09
    rating: number              // 4.6
    isOpen: boolean             // true / false
    category: string            // "Park"
    weather: string             // "sunny" | "rain" | "snow"
    hour: number                // timestamp
    categoryLikedBefore: number // -1: no, 0: no info, 1: yes
}]
`;
