import React from 'react';
import Searchbar from '../components/Searchbar';

const Home = () => (
  <div className="App">
    <header className="Title-header">
      <div className="title">
        <h1>จัดงานศพ</h1>
        <h1>ให้กับคนที่คุณรัก</h1>
      </div>
      <h1>ค้นหาวัด สำหรับงานศพของคุณ</h1>
      <div className="Search-bar">
        <Searchbar onSearch={(query) => console.log(query)} />
      </div>
    </header>
  </div>
);

export default Home;
