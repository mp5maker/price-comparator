import * as React from "react";
import { VictoryPie, VictoryChart, VictoryTheme } from "victory";
import merge from "lodash/merge";

type PieChartType = Partial<React.ComponentProps<typeof VictoryPie>> & {
  chartProps?: Partial<React.ComponentProps<typeof VictoryChart>>;
};

export const PieChart: React.FC<PieChartType> = ({
  chartProps,
  children,
  ...otherProps
}): JSX.Element => {
  const victoryChartProps = merge({}, chartProps ? chartProps : {}, {
    domainPadding: 20,
    theme: merge({}, VictoryTheme.material, { chart: { height: 250 } }),
  });

  const props = {
    ...otherProps,
  };

  return (
    <VictoryChart {...victoryChartProps}>
      <VictoryPie {...props} />
      {children}
    </VictoryChart>
  );
};
