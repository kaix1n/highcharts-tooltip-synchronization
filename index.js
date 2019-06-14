const chartManager = [];

const onMouseMove = (event, target) => {
  const hoverPoint = target.hoverPoint;
  if (hoverPoint && chartManager.length > 1) {
    chartManager.forEach(chart => {
      const { series = [], xAxis = [] } = chart;
      if (series.length === 0) {
        return;
      }
      const visibleSeries = series.filter(serie => serie.visible);
      const points = visibleSeries.reduce((memo, serie) => {
        memo.push(...serie.points);
        return memo;
      }, []);
      const { min = Infinity, max = -Infinity } = xAxis[0] || {};
      const point = points.find(item => item.x === hoverPoint.x);
      chart.pointer.normalize(event);

      if (point) {
        if (
          point.series &&
          hoverPoint &&
          hoverPoint.x >= min &&
          hoverPoint.x <= max
        ) {
          point.onMouseOver();
          chart.tooltip.refresh([point], event);
        } else {
          chart.tooltip.hide();
        }
      }
    });
  }
};

const onMouseLeave = () => {
  chartManager.forEach(chart => {
    const { tooltip, xAxis = [] } = chart;
    if (tooltip) {
      tooltip.hide();
    }
    xAxis.forEach(axis => {
      if (axis.cross) {
        axis.cross.hide();
      }
    });
  });
};

const registerChart = target => {
  const index = chartManager.indexOf(target);
  if (index < 0) {
    chartManager.push(target);
  }
};

const unregisterChart = target => {
  const index = chartManager.indexOf(target);
  if (index >= 0) {
    chartManager.splice(index, 1);
  }
};

const syncTooltip = (target = {}) => {
  if (!target || !target.container) {
    return false;
  }
  registerChart(target);

  const mouseMoveHandler = event => onMouseMove(event, target);
  target.container.addEventListener('mousemove', mouseMoveHandler);
  target.container.addEventListener('mouseleave', onMouseLeave);
  global.requestAnimationFrame(mouseMoveHandler);

  return () => {
    unregisterChart(target);
    target.container.removeEventListener('mousemove', mouseMoveHandler);
    target.container.removeEventListener('mouseleave', onMouseLeave);
  };
};

export default syncTooltip;
