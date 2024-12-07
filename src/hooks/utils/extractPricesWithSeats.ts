import { PricesMapType } from "@/types";

const extractPricesWithSeats = (priceString: string) => {
  if (!priceString.includes("무료")) {
    const priceEntries = priceString.split(", ");
    const pricesMap: PricesMapType = {};

    priceEntries.forEach((entry) => {
      const match = entry.match(/(.*)\s(\d{1,3}(,\d{3})*)원/);
      if (match) {
        const seat = match[1].trim();
        const price = parseInt(match[2].replace(/,/g, ""), 10);
        pricesMap[seat] = price;
      } else if (entry.includes("전석")) {
        const matchFreeSeat = entry.match(/전석\s(\d{1,3}(,\d{3})*)원/);
        if (matchFreeSeat) {
          pricesMap["전석"] = parseInt(matchFreeSeat[1].replace(/,/g, ""), 10);
        }
      }
    });

    const cleanedPrices = Object.values(pricesMap).filter(
      (price) => typeof price === "number",
    ) as number[];

    const minPrice =
      cleanedPrices.length > 0 ? Math.min(...cleanedPrices) : null;
    const maxPrice =
      cleanedPrices.length > 0 ? Math.max(...cleanedPrices) : null;

    return {
      seats: Object.keys(pricesMap),
      prices: Object.values(pricesMap).map((price) =>
        typeof price === "number" ? `${price.toLocaleString()}원` : price,
      ),
      minPrice,
      maxPrice,
    };
  }

  return {
    seats: ["전석"],
    prices: ["무료"],
    minPrice: "무료",
    maxPrice: "무료",
  };
};

export default extractPricesWithSeats;