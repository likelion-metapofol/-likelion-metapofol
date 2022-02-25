import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import "../App.css";
import { Outlet, useNavigate } from 'react-router-dom';
import MetaPofolPopup from '../components/MetaPofolPopup';

const Footer = () => {
    const navigate = useNavigate();
    const [showWalletNeddModal, setWalletNeddModal] = useState(false);

    const [myAddress, setMyAddress] = useState(
        () => JSON.parse(window.localStorage.getItem("myAddress")) || 0
    );

    useEffect(() => {
        window.localStorage.setItem("myAddress", JSON.stringify(myAddress));
    }, [myAddress]);
  
    const goMarket = () => {
        // Market 경로로 이동
        if (!myAddress) {
            setWalletNeddModal(true)
        }
        else {
            navigate('/metapofolmarket');
        }
    };

    const goMint = () => {
        // Mint 경로로 이동
        if (!myAddress) {
            setWalletNeddModal(true)
        }
        else {
            navigate('/metapofolcerti');
        }
    };

    const goMyWallet = () => {
        // Wallet 경로로 이동
        if (!myAddress) {
            setWalletNeddModal(true)
        }
        else {
            navigate('/metapofolwallet');
        }
    };
 

    return (
        <div>
            <footer>
                <nav className="navbar fixed-bottom navbar-light" role="navigation" style={{ backgroundColor: 'white' }}>
                    <Nav className="w-100">
                        <div className="d-flex flex-row justify-content-around w-100">
                            <div className="row d-flex flex-column justify-content-center align-items-center"
                                onClick={goMarket} >
                                <div>
                                    <img src="image/ic_baseline-home.png" />
                                </div>
                            </div>
                            <div className="row d-flex flex-column justify-content-center align-items-center"
                                onClick={goMint} >
                                <div>
                                    <img src="image/ic_round_mint.png" />
                                </div>
                            </div>
                            <div className="row d-flex flex-column justify-content-center align-items-center"
                                onClick={goMyWallet}>
                                <div>
                                    <img src="image/ic_round-person.png" />
                                </div>
                            </div>
                        </div>
                    </Nav>
                </nav>
            </footer>
            {showWalletNeddModal && <MetaPofolPopup popupType="WALLET_NOT_YET" onClose={() => {setWalletNeddModal(false)}} ></MetaPofolPopup>}
        </div>
    );
};

export default Footer;