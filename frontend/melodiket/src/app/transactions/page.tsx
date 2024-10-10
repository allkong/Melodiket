'use client';

import Header from '@/components/organisms/navigation/Header';
import { useFetchTransaction } from '@/services/transaction/transaction';
import { formatDateToYMDHM } from '@/utils/dayjsPlugin';
import { useEffect } from 'react';

const Page = () => {
  const { data, refetch } = useFetchTransaction();

  const handleClick = () => {};

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5 * 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="bg-white overflow-y-auto overflow-x-hidden">
      <Header isFixed />
      <div className="flex flex-col mt-14 w-full min-h-screen overflow-x-auto">
        <p className="h-fit w-full text-xl font-medium text-primary px-4 py-4">
          Melodiket Transactions
        </p>
        <table className="w-fit border-y border-primary text-center border-collapse table-fixed">
          <tbody>
            <tr className="border-b border-pink-50 text-sm font-semibold text-gray-500 items-center">
              <td className="px-1 py-1 w-20">EVENT NAME</td>
              <td className="px-1 py-1 w-40">TX HASH</td>
              <td className="px-1 py-1 w-36">TIMESTAMP</td>
              <td className="px-1 py-1 w-48">ID</td>
            </tr>
            {data?.map((transaction) => (
              <tr
                key={transaction.id}
                className="text-xs font-medium items-center"
              >
                <td className="px-2 py-5 truncate">{transaction.eventName}</td>
                <td className="px-2 py-5 text-primary">
                  <p
                    onClick={handleClick}
                    className="flex border-b border-pink-100 truncate cursor-pointer"
                  >
                    {transaction.transactionHash}
                  </p>
                </td>
                <td className="px-2 py-5 truncate">
                  {formatDateToYMDHM(transaction.timestamp)}
                </td>
                <td className="px-2 py-5 truncate">{transaction.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
