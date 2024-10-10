'use client';

import Header from '@/components/organisms/navigation/Header';
import { useFetchTransaction } from '@/services/transaction/transaction';
import { formatDateToYMDHM } from '@/utils/dayjsPlugin';
import { useEffect } from 'react';

const Page = () => {
  const { data, fetchNextPage, error } = useFetchTransaction();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!error) {
        fetchNextPage();
      }
    }, 5 * 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="w-screen bg-white overflow-y-auto">
      <Header isFixed />
      <div className="flex flex-col mt-14 w-full min-h-screen">
        <p className="h-fit w-full text-xl font-medium text-primary px-4 py-4">
          Melodiket Transactions
        </p>
        <div className="flex-grow h-0 overflow-x-auto">
          <table className="shrink-0 w-fit border-y border-primary text-center border-collapse table-fixed">
            <tbody>
              <tr className="border-b border-pink-50 text-sm font-semibold">
                <td className="px-1 py-1 w-48">TX HASH</td>
                <td className="px-1 py-1 w-48">TIMESTAMP</td>
                <td className="px-1 py-1 w-48">ID</td>
              </tr>
              {data?.pages.map((page) =>
                page.result.map((transaction) => (
                  <tr key={transaction.id} className="text-xs font-medium">
                    <td className="px-4 py-8 text-primary truncate">
                      {transaction.transactionHash}
                    </td>
                    <td className="px-4 py-8 truncate">
                      {formatDateToYMDHM(transaction.timestamp)}
                    </td>
                    <td className="px-4 py-8 truncate">{transaction.id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
