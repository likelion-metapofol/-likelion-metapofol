import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import "./MetaPofol.css";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faWallet, faPlus } from "@fortawesome/free-solid-svg-icons";
import QRCode from "qrcode.react";
import * as KlipAPI from "../api/UseKlip";
import { getBalance, fetchCardsOf } from "../api/UseCaver";
import MetaPofolPopup from '../components/MetaPofolPopup';

import {
   Alert,
   Container,
   Card,
   Nav,
   Form,
   Button,
   Modal,
   Row,
   Col,
} from "react-bootstrap";
const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x00000000000000000000000000000";

const MarketPofolMarketView = () => {
   // const [myAddress, setMyAddress] = useState("0x00000000000000000000000000000");

   const [myAddress, setMyAddress] = useState(
      () => JSON.parse(window.localStorage.getItem("myAddress")) || 0
   );

   const [myBalance, setMyBalance] = useState(
      () => JSON.parse(window.localStorage.getItem("myBalance")) || 0
   );

   const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

   useEffect(() => {
      window.localStorage.setItem("myAddress", JSON.stringify(myAddress));
   }, [myAddress]);

   useEffect(() => {
      window.localStorage.setItem("myBalance", JSON.stringify(myBalance));
   }, [myBalance]);

   const navigate = useNavigate();

   const [showModal, setShowModal] = useState(false);
   
   const [showWalletNeedModal, setWalletNeedModal] = useState(false);

   const [showWalletConnectModal, setWalletConnectModal] = useState(false);

   const [modalProps, setModalProps] = useState({
      title: "MODAL",
      onConfirm: () => { },
   });

   const getUserData = () => {
      console.log(`myAddress ${myAddress}`)
      if (!myAddress) {
         console.log(`myAddress22 ${myAddress}`)
         KlipAPI.getAddress(setQrvalue, async (address) => {
            console.log(`getAddress ${address}`);
            setMyAddress(address);
            const _balance = await getBalance(address);
            setMyBalance(_balance);
         });
      }
   };

   const goMintRegist = () => {
      if (!myAddress) {
         setWalletNeedModal(true)
      }
      else {
         navigate('/metapofolcerti');
      }
   };

   const popupClose = () => {
      setQrvalue("DEFAULT")
   }

   return (
      <div>
         <section>
            {/* <div>
               {myBalance}
            </div>
            <div>
               {myAddress}
            </div> */}
            <button className='button3' onClick={getUserData}>지갑 연동하기</button><br /><br /><br />
            <p className='company'>직장 인증 NFT</p>
            <button className="companybtn" onClick={goMintRegist}></button>
            <button className="companybtn" onClick={goMintRegist}>직업 인증<br/>삼성전자<br/>000팀</button> <br /><br /><br /><br /><br /><br /><br /><br />
            <p className="imgtext">삼성전자 000팀</p>

            <p className='school'>학력 인증 NFT</p>
            <button className="schoolbtn" onClick={goMintRegist}>학력 인증<br/>연세대<br/>수학과</button>
            <button className="schoolbtn" onClick={goMintRegist}>학력 인증<br/>연세대<br/>수학과</button> <br /><br /><br /><br /><br /><br /><br /><br />
            <p className="imgtext2">연세대 수학과</p><p className="imgtext">연세대 수학과</p>

            <p className='award'>수상 경력 인증 NFT</p>
            <button className="awardbtn" onClick={goMintRegist}>수상 인증<br/>해커톤<br/>금상</button>
            <button className="awardbtn" onClick={goMintRegist}>수상 인증<br/>해커톤<br/>금상</button> <br /><br /><br /><br /><br /><br /><br /><br />
            <p className="imgtext2">해커톤 금상</p><p className="imgtext">해커톤 금상</p>

            <p className='etc'>기타 인증 NFT</p><br /><br /><br /><br />
         </section>
         {qrvalue !== "DEFAULT" ? (
               <div>
                  <MetaPofolPopup popupType="WALLET_CONNECT" onClose={popupClose} setaddress={qrvalue} ></MetaPofolPopup>
               </div>
         ) : null}
         <Footer />
         {/* <Modal
            centered
            size="sm"
            show={showModal}
            onHide={() => {
               setShowModal(false);
            }}
         >
            <Modal.Header
               style={{ border: 0, backgroundColor: "black", opacity: 0.8 }}
            >
               <Modal.Title>{modalProps.title}</Modal.Title>
            </Modal.Header>
            <Modal.Footer
               style={{ border: 0, backgroundColor: "black", opacity: 0.8 }}
            >
               <Button
                  variant="secondary"
                  onClick={() => {
                     setShowModal(false);
                  }}
               >
                  닫기
               </Button>
               <Button
                  variant="primary"
                  onClick={() => {
                     modalProps.onConfirm();
                     setShowModal(false);
                  }}
                  style={{ backgroundColor: "#810034", borderColor: "#810034" }}
               >
                  진행
               </Button>
            </Modal.Footer>
         </Modal> */}
         { showWalletNeedModal && <MetaPofolPopup popupType="WALLET_NOT_YET" onClose={() => {setWalletNeedModal(false)}} ></MetaPofolPopup> }
      </div>

   );


}


export default MarketPofolMarketView;