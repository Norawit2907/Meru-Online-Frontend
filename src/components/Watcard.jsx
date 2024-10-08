import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import '../styles/Watcard.css';

const Watcard = () => {
    return (
        <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 15, display: 'inline-flex' }}>
            <div style={{ width: 382, height: 340, background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.60) 100%)', borderRadius: 12 }} />
            <div style={{ width: 188, height: 27, color: 'white', fontSize: 32, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>วัดดูยูมีน</div>
            <div style={{ width: 188, height: 27, color: 'white', fontSize: 18, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>$ 1000 - 5000 บาท</div>
            <div style={{ width: 55, height: 10, position: 'relative' }}>
                <div style={{ width: 10, height: 10, left: 30, top: 0, position: 'absolute', background: 'linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%)', borderRadius: 9999 }} />
                <div style={{ width: 10, height: 10, left: 45, top: 0, position: 'absolute', background: 'linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%)', borderRadius: 9999 }} />
                <div style={{ width: 10, height: 10, left: 15, top: 0, position: 'absolute', background: 'linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%)', borderRadius: 9999 }} />
                <div style={{ width: 10, height: 10, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%)', borderRadius: 9999 }} />
            </div>
            <div style={{ alignSelf: 'stretch', height: 24, color: '#9A9A9A', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '500', wordWrap: 'break-word' }}>123 อ.บางบอน จ.ชลบุรี</div>
        </div>
    );
};

export default Watcard;