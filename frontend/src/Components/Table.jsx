


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ProblemList.css'


import { useNavigate } from 'react-router-dom';

const Table = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/problems`);
                setItems(response.data);
                //console.log(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (index,item) => {
        setSelectedIndex(index);

        navigate(`/compiler/${item._id}`, { state: { description: item.description } });

        console.log(item._id, item.title);
        console.log(item.description);
    };

    return (
        <div className="body">
            <div className="problem-list-container">

            <div className="w-50 relative overflow-x-auto">
            <table className="table-wide text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg text-white uppercase bg-purple-700 dark:bg-purple-800 dark:text-white">
                    <tr>
                        <th scope="col" className=" px-6 py-3 ">
                            Question Title
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <tr
                                key={item._id}
                                className={`${index === selectedIndex ? "bg-black text-white" : "bg-black text-white border-b dark:border-gray-700"
                                    }`}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                                    onClick={() => handleClick(index,item)}
                                >
                                    {item.title}
                                </th>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="1" className="px-6 py-4 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

            </div>
        </div>
    );
};

export default Table;
