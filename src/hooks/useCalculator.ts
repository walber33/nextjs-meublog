import { useState } from 'react';

type InvestmentData = {
  totalAmount: string;
  amountinvested: string;
  totalInterest: string;
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
    const amountinvested = initialValue + monthlyContribution * months;
    // formula para encontrar o juros mensal (1+x)n=(1+R)
    // isolando o x temos:
    // x = (1+R)^(1/n) - 1
    // onde R é a taxa anual e n é o número de períodos (12 meses)
    const monthlyInterestRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;

    for (let i = 0; i < months; i++) {
      totalAmount *= 1 + monthlyInterestRate;
      totalAmount += monthlyContribution;
    }

    return {
      totalAmount: totalAmount.toFixed(2),
      amountinvested: amountinvested.toFixed(2),
      totalInterest: (totalAmount - amountinvested).toFixed(2),
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

  return {
    calculateInvestment,
    handleSubmit,
    investmentData,
  };
};