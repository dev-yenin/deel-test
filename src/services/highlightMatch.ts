import { Option, OptionSubstring } from "../types";
import { generateUniqueIndex } from "./uniqueIndexGenerator";

export const highlight = (option: Option, searchQuery: string) => {
  const { value, id } = option;

  const caseInsensitiveSearchQuery = searchQuery.toLowerCase();
  const result = value.split(new RegExp(`(${searchQuery})`, "gi"));

  return result.map((substring) => ({
    id: `${id}-${generateUniqueIndex.next().value}`,
    value: substring,
    highlight: substring.toLowerCase() === caseInsensitiveSearchQuery,
  }));
};

export const prepareOptions = (
  options: Option[],
  searchValue: string
): OptionSubstring[][] => {
  return options.map((option) => {
    return highlight(option, searchValue);
  });
};
