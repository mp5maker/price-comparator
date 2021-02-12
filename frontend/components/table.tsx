import styles from "../styles/components/table.module.css";

interface TablePropsInterface {
  list: Array<any>;
  theadCustom?: ({
    TheadContent,
  }: {
    TheadContent: JSX.Element | JSX.Element[];
  }) => JSX.Element | JSX.Element[];
  tbodyCustom?: ({
    TbodyContent,
  }: {
    TbodyContent: JSX.Element | JSX.Element[];
  }) => JSX.Element | JSX.Element[];
  properties: Array<string>;
  display: {
    thead: ({
      property,
      index,
    }: {
      property: string;
      index: number;
    }) => JSX.Element | JSX.Element[] | string;
    tbody: ({
      property,
      row,
      rowIndex,
      columnIndex,
    }: {
      property: string;
      row: any;
      rowIndex: number;
      columnIndex: number;
    }) => JSX.Element | JSX.Element[] | string;
  };
  loading?: boolean;
  loadingContent?: JSX.Element | JSX.Element[];
  noDataContent?: JSX.Element | JSX.Element[];
}

export const Table: React.FC<TablePropsInterface> = ({
  list,
  loading,
  display,
  properties,
  loadingContent,
  noDataContent,
  theadCustom,
  tbodyCustom,
  children,
}): JSX.Element => {
  const hasList = Array.isArray(list) && list.length > 0;

  const TheadContent = (
    <thead className={styles.theadContent}>
      <tr className={styles.theadTrContent}>
        {hasList ? (
          properties.map((property, index) => {
            return (
              <th key={index} className={styles.theadThContent}>
                <>{display.thead({ property, index })}</>
              </th>
            );
          })
        ) : (
          <></>
        )}
      </tr>
    </thead>
  );

  const TbodyContent = (
    <tbody className={styles.tbodyContent}>
      {hasList ? (
        list.map((row, rowIndex) => {
          return (
            <tr className={styles.tbodyTrContent} key={rowIndex}>
              {properties.map((property, columnIndex) => {
                return (
                  <td
                    className={styles.tbodyTdContent}
                    key={`${rowIndex}-${columnIndex}`}
                  >
                    <>
                      {display.tbody({ property, row, rowIndex, columnIndex })}
                    </>
                    {columnIndex == 0 ? (
                      <div className={styles.tbodyTrIndicator}>&nbsp;</div>
                    ) : (
                      <></>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })
      ) : (
        <></>
      )}
    </tbody>
  );

  return (
    <div className={styles.tableContainer}>
      {loading ? (
        loadingContent
      ) : (
        <table className={styles.tableContent}>
          {hasList ? (
            <>
              {theadCustom ? theadCustom({ TheadContent }) : TheadContent}
              {tbodyCustom ? tbodyCustom({ TbodyContent }) : TbodyContent}
            </>
          ) : (
            noDataContent
          )}
        </table>
      )}
      {children}
    </div>
  );
};
