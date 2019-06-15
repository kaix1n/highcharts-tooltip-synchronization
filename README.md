# Highcharts tooltip synchronization

[![Greenkeeper badge](https://badges.greenkeeper.io/monopieces/highcharts-tooltip-synchronization.svg)](https://greenkeeper.io/)

Show tooltips on multiple charts if xAxis value are same. Works well for both line and column charts.

[Demo](https://codepen.io/hoppipolla/pen/BgNGKo)

1. Line chart

   ![line chart](./demo/line.png 'Line chart tooltip synchronization')

2. Column chart

   ![column chart](./demo/column.png 'Column chart tooltip synchronization')

- Usage

```js
syncTooltip(highchartsInstance);
```

- Example

```js
import syncTooltip from 'highcharts-tooltip-synchronization';

const Chart = () => {
  let chartRef = React.createRef();
  let config = getConfig();

  React.useEffect(() => {
    const chart = Highcharts.chart(chartRef.current, config);
    syncTooltip(chart);
  }, []);
  return <div ref={chartRef} />;
};
```
