import { ChartDataPoint } from '@/hooks/useCalculator';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';

export const InvestmentChart = ({ data }: { data: ChartDataPoint[] }) => {
  if (data && data.length === 0) return <p>No data to display</p>;

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid />
      <Line
        type='monotone'
        dataKey='total'
        stroke='purple'
        strokeWidth={2}
        name='Total'
        dot={false}
        activeDot={{ stroke: 'white', strokeWidth: 2, r: 5 }}
      />
      <Line
        type='monotone'
        dataKey='compoundInterest'
        stroke='green'
        strokeWidth={2}
        name='Juros Compostos'
        dot={false}
        activeDot={{ stroke: 'white', strokeWidth: 2, r: 5 }}
      />
      <Line
        type='monotone'
        dataKey='monthlyContribution'
        stroke='blue'
        strokeWidth={2}
        name='Aporte Mensal'
        dot={false}
        activeDot={{ stroke: 'white', strokeWidth: 1, r: 5 }}
      />
      <XAxis dataKey='month' />
      <YAxis dataKey='total' />
      <Legend />
      <Tooltip />
    </LineChart>
  );
};
