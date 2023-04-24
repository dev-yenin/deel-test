import { Option } from "../types";
import { mockData } from "./mock-data";

export const queryAnimals = (query: string) => {
  const caseInsensitiveValue = query.toLowerCase();
  const found = mockData.filter(({ value }) =>
    value.toLowerCase().includes(caseInsensitiveValue)
  );

  return Promise.resolve<Option[]>(found);
};
