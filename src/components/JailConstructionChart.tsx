import { useEffect, useRef } from "react";
import Highcharts from "highcharts/esm/highcharts";
import "highcharts/esm/modules/sonification";

import type { JailConstructionInfo } from "../pages/index.astro";

interface JailConstructionChartProps {
  data: JailConstructionInfo[];
}

export const JailConstructionChart = ({ data }: JailConstructionChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    chartRef.current = Highcharts.chart(containerRef.current, {
      title: { text: "U.S Jail Construction", align: "left" },
      yAxis: { title: { text: "Cost in $ billions" } },
      xAxis: { accessibility: { rangeDescription: "Range: 2002 to 2022" } },
      plotOptions: {
        series: {
          pointStart: 2002,
        },
      },
      series: [
        {
          type: "line",
          name: "Project amount",
          data: data?.map((info) => Number(info.project_amount_clean) / 1e9),
        },
      ],
      sonification: {
        enabled: true,
        duration: 3000,
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  const handlePlay = () => {
    chartRef.current?.sonify();
  };

  return (
    <div>
      <div ref={containerRef} style={{ height: 400 }} />
      <button onClick={handlePlay}>Play sonification</button>
    </div>
  );
};
