import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

const SupplierList = () => {
    const [showModal, setShowModal] = useState(false);

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterType, setFilterType] = useState('');
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "CashBook"));
                const transactionData = querySnapshot.docs.map((doc) => doc.data());
                setTransactions(transactionData);
                setFilteredTransactions(transactionData);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };


        fetchTransactions();
    }, []);
    useEffect(() => {
        filterTransactions();
    }, [filterType]);

    const filterTransactions = () => {
        if (filterType === '') {
            setFilteredTransactions(transactions);
        } else {
            const filteredData = transactions.filter(
                (transaction) => transaction.type === filterType
            );
            setFilteredTransactions(filteredData);
        }
    };

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };
    const columns = [
        {
            name: 'Type',
            selector: 'type',
            sortable: true,
        },
        {
            name: 'Date',
            selector: 'date',
        },
        {
            name: 'Amount',
            selector: 'amount',
        },
        {
            name: 'Party Name',
            selector: 'partyName',
        },
        {
            name: 'Remarks',
            selector: 'remarks',
        },
        {
            name: 'Payment Mode',
            selector: 'paymentMode',
        },
    ];
    const customStyles = {
        headCells: {
            style: {
                color: "#ffffff",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#222831",
                marginBottom: "-2px",
            },
        },
        cells: {
            style: {
                color: "#393e46",
                // paddingLeft : "20px",
            },
        },
        rows: {
            style: {
                color: "#393e46",
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                font: "bold",
                fontWeight: "600",
            },
        },
        head: {
            style: {
                borderRadius: "1rem",
                backgroundColor: "#222831",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
                alignItems: "center",
                // justifyContent: "center",
                fontSize: "1rem",
                height: "60px",
            },
        },
    };
    const [type, setType] = useState('cashOut');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [partyName, setPartyName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [paymentMode, setPaymentMode] = useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handlePartyNameChange = (event) => {
        setPartyName(event.target.value);
    };

    const handleRemarksChange = (event) => {
        setRemarks(event.target.value);
    };

    const handlePaymentModeChange = (event) => {
        setPaymentMode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a transaction object
        const transaction = {
            type,
            date,
            amount,
            partyName,
            remarks,
            paymentMode,
        };

        try {
            // Add the transaction to Firestore
            const tripsCollectionRef = collection(db, "CashBook");
            await addDoc(tripsCollectionRef, transaction)

            // Clear the form fields
            setType('cashOut');
            setDate('');
            setAmount('');
            setPartyName('');
            setRemarks('');
            setPaymentMode('');

            console.log('Transaction saved successfully!');
        } catch (error) {
            console.error('Error saving transaction:', error);
        }
    };

    return (
        <div>
            <div className="table w-full h-auto ">
                <div className="w-full h-auto rounded-lg shadow-xl shadow-slate-250">
                    <div className="flex flex-col gap-6 m-2 bg-white rounded-lg shadow-md">
                        <div className="py-4">
                            <label htmlFor="filterType" className="mr-2">
                                Filter by Type:
                            </label>
                            <select
                                id="filterType"
                                value={filterType}
                                onChange={handleFilterChange}
                                className="border border-gray-300 rounded px-2 py-1"
                            >
                                <option value="">All</option>
                                <option value="cashOut">Cash Out</option>
                                <option value="cashIn">Cash In</option>
                            </select>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setShowModal(true)}
                            >
                                Add Transaction
                            </button>


                        </div>
                        <DataTable
                            title="Transactions"
                            columns={columns}
                            noHeader
                            pagination
                            highlightOnHover
                            pointerOnHover
                            className="table"
                            customStyles={customStyles}
                            paginationPerPage={25}
                            data={filteredTransactions}

                        />
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="max-w-md mx-auto bg-white rounded shadow-lg z-20">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Transaction Form</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-1 font-bold" htmlFor="type">
                                        Type:
                                    </label>
                                    <select
                                        id="type"
                                        value={type}
                                        onChange={handleTypeChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="cashOut">Cash Out</option>
                                        <option value="cashIn">Cash In</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-bold" htmlFor="date">
                                        Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={date}
                                        onChange={handleDateChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-bold" htmlFor="amount">
                                        Amount:
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-bold" htmlFor="partyName">
                                        Party Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="partyName"
                                        value={partyName}
                                        onChange={handlePartyNameChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-bold" htmlFor="remarks">
                                        Remarks:
                                    </label>
                                    <textarea
                                        id="remarks"
                                        value={remarks}
                                        onChange={handleRemarksChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-bold" htmlFor="paymentMode">
                                        Payment Mode:
                                    </label>
                                    <input
                                        type="text"
                                        id="paymentMode"
                                        value={paymentMode}
                                        onChange={handlePaymentModeChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save Transaction
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierList;
