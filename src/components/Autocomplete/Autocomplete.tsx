import React, { useEffect, useState } from "react";
import { debounce } from "../../services/debounce";
import { queryAnimals } from "../../services/fakeApi";
import { prepareOptions } from "../../services/highlightMatch";
import { generateUniqueIndex } from "../../services/uniqueIndexGenerator";
import styles from "./styles.module.css";
import { Option } from "../Option/Option";
import { OptionSubstring } from "../../types";

const SEARCH_INPUT_PLACEHOLDER = "Enter text here";
const HANDLE_SEARCH_DELAY = 300;

export const Autocomplete = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<OptionSubstring[][]>([]);
  const [nothingFound, setNothingFound] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const debouncedHandleQuery = debounce(() => {
      if (inputValue === "") {
        setNothingFound(false);
        setOptions([]);
        return;
      }

      queryAnimals(inputValue)
        .then((responseData) => {
          if (responseData.length === 0) {
            setOptions([]);
            setNothingFound(true);
            return;
          }

          const preparedOptions = prepareOptions(responseData, inputValue);
          setOptions(preparedOptions);
          setNothingFound(false);
        })
        .catch((error: Error) => console.error(error.message));
    }, HANDLE_SEARCH_DELAY);

    return debouncedHandleQuery();
  }, [inputValue]);

  return (
    <div className={styles.container}>
      <div className={styles.autocomplete}>
        <input
          type="text"
          placeholder={SEARCH_INPUT_PLACEHOLDER}
          value={inputValue}
          onChange={handleInputChange}
        />
        {nothingFound && <div>Nothing found</div>}
        <ul>
          {options.map((option) => (
            <Option
              key={generateUniqueIndex.next().value as number}
              substringsWithMeta={option}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
