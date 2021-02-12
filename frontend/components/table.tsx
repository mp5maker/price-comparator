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
    }) => JSX.Element | JSX.Element[];
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
    }) => JSX.Element | JSX.Element[];
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
}): JSX.Element => {
  const hasList = Array.isArray(list) && list.length > 0;

  const TheadContent = (
    <thead className={"thead-content"}>
      <tr className={"thead-tr-content"}>
        {hasList ? (
          properties.map((property, index) => {
            return (
              <th key={index} className={"thead-th-content"}>
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
    <tbody className={"tbody-content"}>
      {hasList ? (
        list.map((row, rowIndex) => {
          return (
            <tr className={"tbody-tr-content"} key={rowIndex}>
              {properties.map((property, columnIndex) => {
                return (
                  <td
                    className={"tbody-td-content"}
                    key={`${rowIndex}-${columnIndex}`}
                  >
                    <>
                      {display.tbody({ property, row, rowIndex, columnIndex })}
                    </>
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
    <div className={"table-container"}>
      {loading ? (
        loadingContent
      ) : (
        <table className={"text-content"}>
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
    </div>
  );
};
