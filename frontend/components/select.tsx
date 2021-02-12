interface SelectPropsInterface {
  value: number | string;
  list: Array<any>;
  customDisplay: ({
    item,
  }: {
    item: any;
  }) => string | JSX.Element | JSX.Element[];
  customValue: ({ item }: { item: any }) => string | number;
  onChange: ((params: any) => any) | ((params: any) => void);
  name?: string;
}

export const Select: React.FC<SelectPropsInterface> = ({
  value,
  onChange,
  list,
  customDisplay,
  customValue,
  ...otherProps
}): JSX.Element => {
  return (
    <select value={value} onChange={onChange} {...otherProps}>
      <option value={0}>None</option>
      {list.map((item, index) => {
        const _customValue = customValue({ item });
        const _customDisplay = customDisplay({ item });

        return (
          <option value={_customValue} key={index}>
            {_customDisplay}
          </option>
        );
      })}
    </select>
  );
};
