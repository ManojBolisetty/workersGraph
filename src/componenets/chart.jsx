import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianAxis,
  CartesianGrid,
} from "recharts";
const BarChartComp = ({ data, workerData }) => {
  return (
    <>
      <div className="m-5" style={{ width: "95vw", height: "650px" }}>
        <ResponsiveContainer width="100%">
          <BarChart layout="vertical" data={data} barCategoryGap={-1}>
            <XAxis
              type="number"
              domain={[0, 100]}
              tickCount={11}
              tickFormatter={(tick) => `${tick}%`}
              allowDataOverflow
            />

            <YAxis
              type="number"
              dataKey="layer"
              tickCount={11}
              tickFormatter={(tick) => `${tick}M`}
              reversed
            />

            {workerData.map((worker, index) => (
              <Bar
                key={index}
                dataKey={worker.name}
                stackId="a"
                fill={worker.fill}
                name={worker.name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <h2 className="text-center font-bold mb-5">
          {"Worker's Compensation"}
        </h2>
      </div>
    </>
  );
};

export default memo(BarChartComp);
