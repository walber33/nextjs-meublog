import { useState } from 'react';

export type InvestmentData = {
  total: {
    amount: string;
    amountinvested: string;
    interest: string;
  };
  byPeriod: {
    [key: number]: {
      monthlyContribution: string;
      compoundInterest: string;
      total?: string;
    };
  };
};

export type ChartDataPoint = {
      month: number;
      monthlyContribution: number;
      total: number;
      compoundInterest: number;
};

export const useCalculator = () => {
  
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(null);
  
  const calculateInvestment = (
    initialValue: number,
    monthlyContribution: number,
    interestRate: number,
    investmentDuration: number
  ) => {
    const months = investmentDuration * 12;
    let totalAmount = initialValue;
    const byPeriod: InvestmentData['byPeriod'] = {};
    const amountinvested = initialValue + monthlyContribution * months;
    // formula para encontrar o juros mensal (1+x)n=(1+R)
    // isolando o x temos:
    // x = (1+R)^(1/n) - 1
    // onde R é a taxa anual e n é o número de períodos (12 meses)
    const monthlyInterestRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;

    for (let i = 0; i < months; i++) {
      const contributed = (initialValue + monthlyContribution * (i + 1));
      totalAmount *= 1 + monthlyInterestRate;
      byPeriod[i + 1] = {
        total: totalAmount.toFixed(2),
        compoundInterest: (totalAmount - contributed).toFixed(2),
        monthlyContribution:  contributed.toFixed(2),
      };
      totalAmount += monthlyContribution;
    }

    return {
      total: {
        amount: totalAmount.toFixed(2),
        amountinvested: amountinvested.toFixed(2),
        interest: (totalAmount - amountinvested).toFixed(2),
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

    setInvestmentData(calculateInvestment(initialValue, monthlyContribution, interestRate, investmentDuration));
  };

  const investmentToChart = (data = investmentData): ChartDataPoint[] => {
    if (!data) return [];
    const chartData: ChartDataPoint[] = data.byPeriod ? Object.entries(data.byPeriod).map(([month, values]) => ({
      month: Number(month),
      monthlyContribution: Number(values.monthlyContribution),
      total: Number(values.total || 0),
      compoundInterest: Number(values.compoundInterest || 0),
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