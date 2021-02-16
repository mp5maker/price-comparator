import * as React from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import merge from "lodash/merge";

type BarChartType = Partial<React.ComponentProps<typeof VictoryBar>> & {
  chartProps?: Partial<React.ComponentProps<typeof VictoryChart>>;
};

export const BarChart: React.FC<BarChartType> = ({
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
      <VictoryBar {...props} />
      {children}
    </VictoryChart>
  );
};
