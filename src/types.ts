export type OptionProps = {
  substringsWithMeta: OptionSubstring[];
};

export type Option = { id: string; value: string };

export type OptionSubstring = Option & { highlight: boolean };
