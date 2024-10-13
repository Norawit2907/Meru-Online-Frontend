import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import Searchbar from '../components/Searchbar';
import '../styles/Result.css';
import Watcard from '../components/Watcard';

const Result = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const date = new URLSearchParams(location.search).get('date');

    useEffect(()=>{
        console.log(query)
    },[])

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className="Container">
                <div>
                    <div>
                        <h2>เราหาวัดมาคุณให้แล้ว</h2>
                        <p>คุณค้นหา: {query}</p>
                        <p>เริ่มวันที่: {formatDate(new URLSearchParams(location.search).get('startDate'))}</p>
                        <p>จบวันที่: {formatDate(new URLSearchParams(location.search).get('endDate'))}</p>
                    </div>
                    <div className="Filter">
                        <button>Filter</button>
                    </div>
                    
                </div>
                <div className="Search-bar">
                    <Searchbar onSearch={(query) => console.log(query)} initialQuery={query} initialDate={date} />
                </div>
                
                <Watcard/>
                
                
            </div>

        </>
    );
};

export default Result;