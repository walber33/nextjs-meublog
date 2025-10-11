'use client';
import { Button } from '@/components/button';
import { Heading } from '@/components/heading';
import { useCalculator } from '@/hooks/useCalculator';
export default function calcPage() {
  const { handleSubmit, investmentData } = useCalculator();

  return (
    <div className='mx-auto mt-4 w-fit'>
      <Heading heading='primary'>
        Calculadora de Juros (Work in Progress)
      </Heading>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-4 justify-between'>
            <div>
              <label htmlFor='initialValue'>Insira o valor inicial:</label>
              <input name='initialValue' id='initialValue' type='number' />
            </div>
            <div>
              <label htmlFor='monthlyContribution'>Aporte mensal:</label>
              <input
                name='monthlyContribution'
                id='monthlyContribution'
                type='number'
              />
            </div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div>
              <label htmlFor='interestRate'>Insira a taxa de juros:</label>
              <input name='interestRate' id='interestRate' type='number' />
            </div>
            <div>
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
        </div>
        <Button>Calcular</Button>
      </form>
      {investmentData && (
        <div>
          <h2>Resultados</h2>
          <p>Valor total: {investmentData.totalAmount}</p>
          <p>Valor investido: {investmentData.amountinvested}</p>
          <p>Juros totais: {investmentData.totalInterest}</p>
        </div>
      )}
    </div>
  );
}
