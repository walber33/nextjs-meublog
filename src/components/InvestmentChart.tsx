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

export const InvestmentChart = ({
  data,
  children,
  childrenPosition = 'right',
}: {
  data: ChartDataPoint[];
  children?: React.ReactNode;
  childrenPosition?: 'right' | 'left' | 'top' | 'bottom';
}) => {
  if (data && data.length === 0) return <p>No data to display</p>;
  const childrenPos = {
    right: 'flex-row',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };

  // get screen width
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const graphsize = 0.6 * screenWidth;
  return (
    <div className={`flex ${childrenPos[childrenPosition]}`}>
      <LineChart width={graphsize} height={graphsize / 2} data={data}>
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
          stroke='orange'
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
        <Line
          type='monotone'
          dataKey='totalWithInflation'
          stroke='green'
          strokeWidth={2}
          name='Total ajustado pela inflação'
          dot={false}
          activeDot={{ stroke: 'white', strokeWidth: 2, r: 5 }}
        />
        <XAxis dataKey='month' />
        <YAxis dataKey='total' />
        <Legend />
        <Tooltip />
      </LineChart>
      {children}
    </div>
  );
};
