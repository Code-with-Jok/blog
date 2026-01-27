import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

interface CustomPieChartProps {
  colors: string[];
  data: {
    name: string;
    tag: string;
    count: number;
  }[];
}

const CustomPieChart = ({ colors, data }: CustomPieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
