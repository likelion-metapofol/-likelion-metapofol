import React from "react";
import "./MetaPofol.css";
import { Outlet, useNavigate } from 'react-router-dom';

const MetaPofolMainView = () => {
  const navigate = useNavigate();

  const goMarket = () => {
    // articles 경로로 이동
    navigate('/metapofolmarket', { replace: true });
  };

  return (
      <section>
        <p className="text1">Meta <br />Portfolio </p>
        <p className="text2">나만의 경력을 <br />NFT에 저장하고 <br />한번에 모아보세요 </p>
        <img className="uniimg" src="image/main_university.png" />
        <button className="button1">기관</button> <br />
        <button className="button2" onClick={goMarket}>개인</button>
      </section>
  );
};

export default MetaPofolMainView;