import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

const SupplierList = () => {
    const [showModal, setShowModal] = useState(false);
    const [filterFromDate, setFilterFromDate] = useState('');
    const [filterToDate, setFilterToDate] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [EditModal, setEditModal] = useState(false);
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
    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleFromDateChange = (event) => {
        setFilterFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setFilterToDate(event.target.value);
    };

    const id = uuidv4();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Suppliers"));
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
    }, [filterType, filterFromDate, filterToDate]);

    const openEditModal = () => {
        setEditModal(true);
    };

    const CloseEditModal = () => {
        setEditModal(false);
    };



    const filterTransactions = () => {
        let filteredData = transactions;

        if (filterType !== '') {
            filteredData = filteredData.filter((transaction) => transaction.type === filterType);
        }

        if (filterFromDate !== '' && filterToDate !== '') {
            const fromDate = Timestamp.fromDate(new Date(filterFromDate));
            const toDate = Timestamp.fromDate(new Date(filterToDate));

            filteredData = filteredData.filter(
                (transaction) =>
                    transaction.date >= fromDate.toMillis() && transaction.date <= toDate.toMillis()
            );
        }

        setFilteredTransactions(filteredData);
    };

 

    const columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,

            cell: (row) => (
              <Link to={`/view-Supplier/${row.id}`}>
                <div className="text-[#393e46] text-center m-2 cursor-pointer font-medium text-sm font-sans hover:transform hover:scale-125 hover:font-base transition duration-300 ease-in-out">
                  <td className="py-3 text-[#393e46] text-center font-medium text-sm font-sans">
                    <span className="truncate text-center text-sm font-sans text-[#323EDD] cursor-pointer  font-semibold ">
                      {row.id}
                    </span>
                  </td>
                </div>
              </Link>
            ),
            
        },
        {
            name: 'Date & Time',
            selector: 'date',
        },
        {
            name: 'Remarks',
            selector: 'remarks',
        },
        {
            name: 'Type',
            selector: 'type',
            sortable: true,
        },
        {
            name: 'Party Name',
            selector: 'partyName',
        },
        {
            name: 'Payment Mode',
            selector: 'paymentMode',
        },
        {
            name: 'Amount',
            selector: 'amount',
        },
        
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <div
                        className="text-[#393e46] text-center m-2 cursor-pointer font-medium text-sm font-sans hover:transform hover:scale-125 hover:font-base transition duration-300 ease-in-out"

                    >
                        <MdDelete className="text-xl cursor-pointer hover:text-red-600" />
                    </div>
                    <div
                        className="text-[#393e46] text-center m-2 cursor-pointer font-medium text-sm font-sans hover:transform hover:scale-125 hover:font-base transition duration-300 ease-in-out"
                        onClick={openEditModal}
                    >
                        <MdModeEditOutline className="text-xl cursor-pointer hover:text-red-600" />
                    </div>
                </>
            ),
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

                backgroundColor: "#222831",

                alignItems: "center",
                // justifyContent: "center",
                fontSize: "1rem",
                height: "60px",
            },
        },
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
            createdAt: new Date().toISOString(),
            id: id,
        };

        try {
            // Add the transaction to Firestore
            const cashbookref = collection(db, "Suppliers");
            await addDoc(cashbookref, transaction)

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
                    <div className="flex flex-col gap-6 m-2 ">
                        <div className="py-4">
                            <label htmlFor="filterType" className="mr-2">
                                Filter :
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
                            <label htmlFor="fromDate" className="mr-2 ml-4">
                                From:
                            </label>
                            <input
                                type="date"
                                id="fromDate"
                                value={filterFromDate}
                                onChange={handleFromDateChange}
                                className="border border-gray-300 rounded px-2 py-1"
                            />

                            <label htmlFor="toDate" className="mr-2 ml-4">
                                To:
                            </label>
                            <input
                                type="date"
                                id="toDate"
                                value={filterToDate}
                                onChange={handleToDateChange}
                                className="border border-gray-300 rounded px-2 py-1"
                            />
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

                        {/* <EditTranscation
                            isOpen={openEditModal}
                            onClose={CloseEditModal}
                            date="2023-06-18"
                            remarks="Sample remarks"
                            type="Cash Out"
                            party="Sample party"
                            time="14:30"
                        /> */}
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
