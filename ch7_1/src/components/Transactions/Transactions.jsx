import React, { useTransition } from 'react';

const Transactions = () => {
  const {data: transactions } = useTransition();

  return (
    <div>
      <h1>Transactions</h1>
      <main>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map((trx) => (
              <tr>
                <td>{trx.date}</td>
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

    </div>
  );
};

export default Transactions;