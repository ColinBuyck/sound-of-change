import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import type { JailConstructionInfo } from "../pages/index.astro";

interface JailConstructionChartProps {
  data: JailConstructionInfo[];
}

const JailConstructionChart = ({ data }: JailConstructionChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    Highcharts.chart(containerRef.current, {
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
    });
  }, []);

  return <div ref={containerRef} />;
};

export default JailConstructionChart;
