import { OptionProps } from "../../types";
import styles from "./styles.module.css";

export const Option = (props: OptionProps) => {
  const { substringsWithMeta } = props;

  return (
    <li className={styles.li}>
      {substringsWithMeta.map(({ highlight, value, id }) => {
        if (highlight) {
          return (
            <span className={styles.highlight} key={id}>
              {value}
            </span>
          );
        }

        return <span key={id}>{value}</span>;
      })}
    </li>
  );
};
