import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_TRANSACTION_WITH_HASH } from "../../utils/queries";

function Transaction() {
    const { hash } = useParams();
    const [transaction, setTransaction] = useState();
    const { loading, error, data } = useQuery(GET_TRANSACTION_WITH_HASH, { variables: { hash } });
    useEffect(()=> {
        setTransaction(data?.transactions[0]);
    }, [data])
    
    return (
        <div className="p-10 ">
            <h1 className="border-b pb-3 border-gray-500 font-semibold text-3xl">Transaction Details</h1>
            <div className="my-8 p-8 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                {loading ? <div className="p-4 flex justify-center items-center">Loading ...</div> : 
                <div>
                    <div className="flex my-4">
                        <p className="w-1/4">Transaction Hash:</p>
                        <p>{transaction?.hash}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Block:</p>
                        <p>{transaction?.block_number}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Timestamp:</p>
                        <p>{transaction?.timestamp}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">From:</p>
                        <p>{transaction?.from}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">To:</p>
                        <p>{transaction?.to}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Value:</p>
                        <p>{transaction?.value}</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Transaction
