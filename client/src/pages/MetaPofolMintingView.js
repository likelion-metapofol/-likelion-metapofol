import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import MetaPofolPopup from '../components/MetaPofolPopup';
import "../App.css";
import "./MetaPofoNFT.css";
import * as KlipAPI from "../api/UseKlip";
import QRCode from "qrcode.react";


import axios from "axios";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x00000000000000000000000000000";

function MetaPofolMintingView() {
    const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

    const navigate = useNavigate();
    const location = useLocation();

    console.log(` useParams ${location} ${location.state}`)
    const [showModal, setShowModal] = useState(false);

    const [myAddress, setMyAddress] = useState(
        () => JSON.parse(window.localStorage.getItem("myAddress")) || 0 
     );
     
     const [myBalance, setMyBalance] = useState(
        () => JSON.parse(window.localStorage.getItem("myBalance")) || 0
     );

    const goMyWallet = () => {
        setShowModal(false)
        navigate(-1);
    } 

    // 
    const onClickMint = async (uri) => {
        if (myAddress === DEFAULT_ADDRESS) {
          alert("NO ADDRESS");
          return;
        }
        const randomTokenId = parseInt(Math.random() * 10000000);
        KlipAPI.mintCardWithURI(
          myAddress,
          randomTokenId,
          uri,
          setQrvalue,
          (result) => {
              updateAuthStatus();
              alert(JSON.stringify(result));
          }
        );
       
      };


    // 상태 업데이트 함수 (NFT 민팅시 인증상태를 02 -> 03으로 변경)
    const updateAuthStatus = () => {
        const body = { 
            _id: location.state.id
        }
        axios.patch('/api/update-auth_status', body)
        .then(res => {
            console.log(res);
            // 완료 시 팝업 호출 
            setShowModal(true);
        });
        goMyWallet();
    }

    const popupClose = () => {
        setQrvalue("DEFAULT");
        updateAuthStatus();
     }

    // 타입을 가지고 이미지 색상을 표시 해야 함.
    return (
        <div>
            <section>
                <div>
                    <div className="mint-nft-type" style={{ backgroundColor: "#A5C5F6" }}>
                        <div className="mint-nft-type-text">학력 인증</div>
                        <div className="mint-nft-type-title-text">{location.state.title}</div>
                    </div>

                    <div className="blocktext mint-nft-info-text">{location.state.description}</div>

                    <div className="blocktext mint-nft-certi-info-text" style={{ marginTop: 30 }}>인증이 완료되었습니다.</div>
                    <div className="blocktext mint-nft-certi-info-text">나만의 경력을 블록체인에 기록하세요.</div>

                    <div className="mint-nft-payment" >
                        <div className="d-flex flex-row justify-content-around">
                            <div className="row d-flex flex-column justify-content-center align-items-center" >
                                <div className="mint-nft-certi-info-text">민팅 비용</div>
                                <div className="mint-nft-payment-text">0.1 KLAY</div>

                            </div>
                            <div className="row d-flex flex-column justify-content-center align-items-center" >

                                <div className="mint-nft-certi-info-text">내 지갑</div>
                                <div className="mint-nft-payment-text">{myBalance} KLAY</div>
                            </div>
                        </div>
                    </div>

                    <button className="mint-nft-mint-btn" onClick={onClickMint} >NFT 발행하기</button>
                </div>

            </section>
            {qrvalue !== "DEFAULT" ? (
               <div>
                  <MetaPofolPopup popupType="WALLET_CONNECT" onClose={popupClose} setaddress={qrvalue} ></MetaPofolPopup>
               </div>
             ) : null}
         
            { showModal && <MetaPofolPopup popupType="MINT_COMPLETE" onClose={updateAuthStatus} ></MetaPofolPopup>
            }
        </div>
    );
}

export default MetaPofolMintingView;