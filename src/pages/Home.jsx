import React from 'react';
import Searchbar from "../components/Searchbar";

const Home = () => {
  return (
    <div className="App">
      <header className="Title-header">
        <div className="title">
          <h1>จัดงานศพ</h1>
          <h1>ให้กับคนที่คุณรัก</h1>
        </div>
        <h2>ค้นหาวัด สำหรับงานศพของคุณ</h2>
      <Searchbar onSearch={(query) => console.log(query)} />
      </header>
    </div>
  );
};

export default Home;