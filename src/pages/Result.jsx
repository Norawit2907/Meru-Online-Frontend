import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import Searchbar from '../components/Searchbar';
import '../styles/Result.css';
import Watcard from '../components/Watcard';
import { GetWatCard } from '../services/search';

const Result = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const date = new URLSearchParams(location.search).get('date');
    const startDate = new URLSearchParams(location.search).get('startDate');
    const endDate = new URLSearchParams(location.search).get('endDate');
    const [watData, setWatData] = useState([]);

    useEffect( ()=>{
        async function getwat(query, startDate, endDate) {
            const result = await GetWatCard(query, startDate, endDate);
            setWatData(result)
            console.log(watData)
        }
        
        getwat(query, startDate, endDate)
    },[])

    useEffect( ()=>{
        async function getwat(query, startDate, endDate) {
            const result = await GetWatCard(query, startDate, endDate);
            setWatData(result)
            console.log(watData)
        }
        
        getwat(query, startDate, endDate)
    },[query, startDate, endDate])

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (    
    <div className="w-3/4 mx-auto my-20">
        <Searchbar onSearch={(query) => {}} initialQuery={query} initialDate={date} />
        <p className='font-bold text-[#AD957B] text-4xl mb-4'>ผลลัพธ์การค้นหาวัด</p>
        <div className='grid grid-cols-4 gap-5 gap-y-10'>
            {
                watData ?
                watData.map((wat) =>(
                    <Watcard id={wat.id} image={wat.picture[0]} title={wat.name} minprice={wat.min_cost} maxprice={wat.max_cost} location={wat.location} />
                ))
                :
                null
            }
            <Watcard image='/temple.jpg' title="วัดอรุณราชวรารามราชวรมหาวิหาร" minprice="1000" maxprice="5000" location="เลขที่ 34 ถนนวังเดิม แขวงวัดอรุณเขตบางกอกใหญ่ กรุงเทพมหานคร 10600"/>
        </div>
        
        
    </div>

       
    );
};

export default Result;