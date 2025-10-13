import { useState } from 'react';

export type InvestmentData = {
  total: {
    amount: string;
    amountinvested: string;
    interest: string;
    totalWithInflation?: string;
  };
  byPeriod: {
    [key: number]: {
      monthlyContribution: string;
      compoundInterest: string;
      total?: string;
      totalWithInflation?: string;
    };
  };
};

export type ChartDataPoint = {
      month: number;
      monthlyContribution: number;
      total: number;
      compoundInterest: number;
};

export type investimentCalculationParams = {
  initialValue: number;
  monthlyContribution: number;
  interestRate: number;
  investmentDuration: number;
  inflationRate?: number;
};

export type GroupByOptions = 'month' | 'year' | 'semester' | 'decade';

export const useCalculator = () => {
  
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(null);
  
  const calculateInvestment = ({
    initialValue,
    monthlyContribution,
    interestRate,
    investmentDuration,
    inflationRate
  }: investimentCalculationParams) => {
    const months = investmentDuration * 12;
    let totalAmountNoInflation = initialValue;
    let totalAmountWithInflation = inflationRate ? initialValue : undefined;
    const byPeriod: InvestmentData['byPeriod'] = {};
    const amountinvested = initialValue + monthlyContribution * months;
    // formula para encontrar o juros mensal (1+x)n=(1+R)
    // isolando o x temos:
    // x = (1+R)^(1/n) - 1
    // onde R é a taxa anual e n é o número de períodos (12 meses)
    const monthlyInterestRate = (Math.pow(1 + interestRate / 100, 1 / 12) - 1);
    const monthlyInflationRate = inflationRate ? (Math.pow(1 + inflationRate / 100, 1 / 12) - 1) : 0;
    const inflationAdjustmentFactor = (1 + monthlyInterestRate) / (1 + monthlyInflationRate);
    byPeriod[0] = {
      total: totalAmountNoInflation.toFixed(2),
      totalWithInflation: totalAmountWithInflation ?  totalAmountWithInflation.toFixed(2) : undefined,
      compoundInterest: '0',
      monthlyContribution: initialValue.toFixed(2),
    };

    for (let i = 0; i < months; i++) {
      const contributed = (initialValue + monthlyContribution * (i + 1));
      totalAmountNoInflation *= 1 + monthlyInterestRate;
      totalAmountNoInflation += monthlyContribution;
      if (totalAmountWithInflation) {
        totalAmountWithInflation *= inflationAdjustmentFactor;
        totalAmountWithInflation += monthlyContribution;
      }
      byPeriod[i + 1] = {
        total: totalAmountNoInflation.toFixed(2),
        compoundInterest: (totalAmountNoInflation - contributed).toFixed(2),
        monthlyContribution:  contributed.toFixed(2),
        totalWithInflation: totalAmountWithInflation ? totalAmountWithInflation.toFixed(2) : undefined,
      };
    }

    return {
      total: {
        amount: totalAmountNoInflation.toFixed(2),
        amountinvested: amountinvested.toFixed(2),
        interest: (totalAmountNoInflation - amountinvested).toFixed(2),
        totalWithInflation: totalAmountWithInflation ? totalAmountWithInflation.toFixed(2) : undefined,
      },
      byPeriod
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const initialValue = Number(formData.get('initialValue'));
    const monthlyContribution = Number(formData.get('monthlyContribution'));
    const interestRate = Number(formData.get('interestRate'));
    const investmentDuration = Number(formData.get('investmentDuration'));
    const inflationRate = Number(formData.get('inflationRate') || 0);

    setInvestmentData(calculateInvestment({initialValue, monthlyContribution, interestRate, investmentDuration, inflationRate}));
  };

  const investmentToChart = ({ data = investmentData, groupBy = 'month'}: {data?: InvestmentData | null; groupBy?: GroupByOptions }): ChartDataPoint[] => {
    if (!data) return [];
    const groupFactor = {
      month: 1,
      semester: 6,
      year: 12,
      decade: 120,
    }[groupBy];
    const groupedByPeriod: InvestmentData['byPeriod'] = {};
    if (groupBy && groupFactor > 1) {
      Object.entries(data.byPeriod).forEach(([monthStr, values]) => {
        const month = Number(monthStr);
        if(month % groupFactor !== 0) return; 
        const groupKey = Math.ceil(month / groupFactor);
        if (!groupedByPeriod[groupKey]) {
          groupedByPeriod[groupKey] = {
            monthlyContribution: '0',
            compoundInterest: '0',
            total: '0',
            totalWithInflation: values.totalWithInflation ? '0' : undefined,
          };
        }
        groupedByPeriod[groupKey].monthlyContribution =  values.monthlyContribution;
        groupedByPeriod[groupKey].compoundInterest =  values.compoundInterest;
        groupedByPeriod[groupKey].total = (Number(values.total || 0)).toFixed(2);
        if (values.totalWithInflation) {
          groupedByPeriod[groupKey].totalWithInflation = (Number(values.totalWithInflation || 0)).toFixed(2);
        }
      });
    } else {
      Object.assign(groupedByPeriod, data.byPeriod);
    }
    const chartData: ChartDataPoint[] = groupedByPeriod ? Object.entries(groupedByPeriod).map(([month, values]) => ({
      month: Number(month),
      monthlyContribution: Number(values.monthlyContribution),
      total: Number(values.total || 0),
      compoundInterest: Number(values.compoundInterest || 0),
      totalWithInflation: values.totalWithInflation ? Number(values.totalWithInflation) : undefined,
    })) : [];
    if (chartData.length > 0) return chartData;
    return [];
  }

  return {
    calculateInvestment,
    handleSubmit,
    investmentData,
    investmentToChart
  };
};