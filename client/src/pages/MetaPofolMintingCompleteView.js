import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import MetaPofolPopup from '../components/MetaPofolPopup';
import "../App.css";
import "./MetaPofoNFT.css";
import Footer from "../components/Footer";
import axios from "axios";

function MetaPofolMintingCompleteView() {

    const location = useLocation();

    console.log(` useParams ${location} ${location.state}`)
    const [showModal, setShowModal] = useState(false);

    var caseUI = {
        "company" :
            <div className="mint-nft-type" style={{ marginTop: 54, backgroundColor: "#F6C7A5" }}>
                <div className="mint-nft-type-text">직업 인증</div>
                <div className="mint-nft-type-title-text">{location.state.title}</div>
            </div>
        ,
        "school" :
            <div className="mint-nft-type" style={{ marginTop: 54, backgroundColor: "#A5C5F6" }}>
                <div className="mint-nft-type-text">학력 인증</div>
                <div className="mint-nft-type-title-text">{location.state.title}</div>
            </div>
        ,
        "award" :
            <div className="mint-nft-type" style={{ marginTop: 54, backgroundColor: "#F6A5A5" }}>
                <div className="mint-nft-type-text">수상 인증</div>
                <div className="mint-nft-type-title-text">{location.state.title}</div>
            </div>
        ,
        "etc" :
            <div className="mint-nft-type" style={{ marginTop: 54, backgroundColor: "#A5A6F6" }}>
                <div className="mint-nft-type-text">기타 인증</div>
                <div className="mint-nft-type-title-text">{location.state.title}</div>
            </div>
    }
    return (
        <div>
            <section>
                <div>
                    <div>
                        <img className="mint-nft-certi" src="image/metapofol_mint_badge.png" ></img>
                        {caseUI[location.state.authtype]}
                    </div>
                    <div className="blocktext mint-nft-info-text" style={{maringTop: 60}}>{location.state.description}</div>

                    <div className="blocktext mint-nft-chain-info">
                        <div>
                            <div className="mint-nft-chain-info-title" style={{marginBottom: 30}}>Chain Info</div>
                            <div className="mint-nft-chain-info-subtitle" >Date</div>
                            <div className="mint-nft-chain-info-text">{location.state.date}</div>
                            <div className="mint-nft-chain-info-subtitle">Current Adress</div>
                            <div className="mint-nft-chain-info-text">{location.state.address}</div>
                            <div className="mint-nft-chain-info-subtitle">Token ID</div>
                            <div className="mint-nft-chain-info-text">{location.state.id}</div>
                            <div className="mint-nft-chain-info-subtitle">file</div>
                        </div>
                    </div>
                

                    <button className="mint-nft-mint-btn">공유 하기</button>
                </div>

            </section>
            <Footer/>
        </div>
    );
}
export default MetaPofolMintingCompleteView;