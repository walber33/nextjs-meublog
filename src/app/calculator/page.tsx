'use client';
import { Button } from '@/components/button';
import { Heading } from '@/components/heading';
import { InvestmentChart } from '@/components/InvestmentChart';
import { GroupByOptions, useCalculator } from '@/hooks/useCalculator';
import { useState } from 'react';
export default function CalculatorPage() {
  const { handleSubmit, investmentData, investmentToChart } = useCalculator();
  const [groupBy, setGroupBy] = useState<GroupByOptions>('month');
  return (
    <div className='mx-auto mt-4 w-fit'>
      <Heading heading='primary'>
        Calculadora de Juros (Work in Progress)
      </Heading>
      <form className='flex flex-col gap-8 px-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <div className='grid gap-2 md:gap-4 justify-between grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col md:flex-row justify-between'>
              <label htmlFor='initialValue'>Insira o valor inicial:</label>
              <input name='initialValue' id='initialValue' type='number' />
            </div>
            <div className='flex flex-col md:flex-row justify-between'>
              <label htmlFor='monthlyContribution'>Aporte mensal:</label>
              <input
                name='monthlyContribution'
                id='monthlyContribution'
                type='number'
              />
            </div>
          </div>
          <div className='grid gap-2 md:gap-4 justify-between grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col md:flex-row justify-between relative'>
              <label htmlFor='interestRate'>
                Insira a taxa de juros(anual):
              </label>
              <input name='interestRate' id='interestRate' type='number' />
              <p className='absolute bottom-0 md:bottom-full md:top-0 right-0 select-none content-center w-7 h-[27px] md:h-full text-center bg-slate-500 text-white'>
                %
              </p>
            </div>
            <div className='flex flex-col md:flex-row justify-between relative'>
              <label htmlFor='investmentDuration'>
                Insira o tempo (em anos):
              </label>
              <input
                name='investmentDuration'
                id='investmentDuration'
                type='number'
              />
            </div>
          </div>
          <div className='grid gap-2 md:gap-4 justify-between grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col md:flex-row justify-between relative'>
              <label htmlFor='inflationRate'>Insira a inflação(anual):</label>
              <input name='inflationRate' id='inflationRate' type='number' />
              <p className='absolute bottom-0 md:bottom-full md:top-0 right-0 select-none content-center w-7 h-[27px] md:h-full text-center bg-slate-500 text-white'>
                %
              </p>
            </div>
          </div>
        </div>
        <Button>Calcular</Button>
      </form>
      {investmentData && (
        <>
          <div>
            <h2>Resultados</h2>
            <p>Valor total: {investmentData.total.amount}</p>
            <p>Valor investido: {investmentData.total.amountinvested}</p>
            <p>Juros totais: {investmentData.total.interest}</p>
            {investmentData.total.totalWithInflation && (
              <p>
                Valor total ajustado pela inflação:{' '}
                {investmentData.total.totalWithInflation}
              </p>
            )}
          </div>
          <InvestmentChart
            data={investmentToChart({
              data: investmentData,
              groupBy: groupBy,
            })}
            childrenPosition='top'
          >
            <div className='flex flex-col gap-2 w-fit'>
              <label htmlFor='groupBy'>Agrupar por:</label>
              <select
                id='groupBy'
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as GroupByOptions)}
              >
                <option value='month'>Mês</option>
                <option value='year'>Ano</option>
                <option value='semester'>Semestre</option>
                <option value='decade'>Década</option>
              </select>
            </div>
          </InvestmentChart>
        </>
      )}
    </div>
  );
}
