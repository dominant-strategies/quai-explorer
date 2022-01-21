import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { TRANSACTION_TABLE_HEADER } from "../../constants";
import { GET_TRANSACTIONS } from "../../utils/queries";
import { reduceString } from "../../utils";
import { Spinner } from '@chakra-ui/react';

export default function TransactionTable({setTransactionsCount}) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const {loading, error, data } = useQuery(GET_TRANSACTIONS, { variables: { num: limit, offset: (currentPage - 1) * limit } });
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        if (data) {
            setTransactions(data?.transactions);
            const transactionsCount = data?.transactions_aggregate?.aggregate?.count;
            setTransactionsCount(transactionsCount);
            setTotalPage(parseInt(transactionsCount/limit) + 1);
        }
    }, [data])

    if (error) {
        console.log(error)
        return <p>Error</p>;
    }

    return (
        <div>
            {!loading ?
            <div className="flex flex-col">
                <div className="border border-b-0 rounded-t-lg text-2xl font-semibold border-t px-6 py-4 bg-white text-black">
                    <h1>Transactions</h1>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-transaction min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full border">
                                <thead className="bg-transparent border-b">
                                    <tr>
                                        {TRANSACTION_TABLE_HEADER?.map(header =>
                                            <th key={header} scope="col" className="text-sm font-bold px-6 py-4 text-left">
                                                {header}
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                 
                                    <tbody>
                                        {transactions?.map((transaction, index) => (
                                            <tr key={index} className="bg-transparent cursor-pointer border-b transition duration-300 ease-in-out hover:bg-base-300" onClick={()=>navigate(`/tx/${transaction.hash}`)}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{reduceString(transaction.hash)}</td>
                                                <td className="text-sm px-6 py-4 whitespace-nowrap">
                                                    {transaction.block_number}
                                                </td>
                                                <td className="text-sm px-6 py-4 whitespace-nowrap">
                                                    {transaction.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} setLimit={setLimit} totalPage={totalPage} />
            </div> : <Spinner size={"xl"} label='Loading the transactions table' />}
        </div>
    )
}
