import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./MetaPofolWallet.css";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import MetaPofolPopup from '../components/MetaPofolPopup';
import { selectAllNFT } from "../api/UseCaver";
import { Card } from "react-bootstrap";
import axios from "axios";

function MetaPofolWallet() {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [myAddress, setMyAddress] = useState(
        () => JSON.parse(window.localStorage.getItem("myAddress")) || 0
    );

    const [myBalance, setMyBalance] = useState(
        () => JSON.parse(window.localStorage.getItem("myBalance")) || 0
    );

    const [nfts, setNfts] = useState([]);
    const [mintnfts, setMintNfts] = useState([]);

    // 이미지 클릭 시 
    const goMintView = (id) => {
        /*
         * 해당 이미지에 세팅된 데이터 정보를 가지고 상세 데이터 조회
         * 화면 전환 후 화면 인입시 상세 데이터를 조회 또는 NFT 이미지 클릭시 데이터 조회
         */
        const body = {
            _id: id
        }
        axios.post('/api/select-one-auth', body)
            .then(res => {
                navigate('/metapofolminting', {
                    state: {
                        id: res.data.authInfo._id,
                        authtype: res.data.authInfo.ctg_id,
                        title: res.data.authInfo.auth_title,
                        description: res.data.authInfo.auth_description,
                    }
                });
            });
    }

    const goNFTDetailView = (id) => {

        const body = {
            _id: id
        }
        axios.post('/api/select-one-auth', body)
        .then(res => {
            navigate('/metapofolmintingcomplete', {
                state: {
                    id: res.data.authInfo._id,
                    address: res.data.authInfo.address,
                    date: res.data.authInfo.cre_dtm,
                    authtype: res.data.authInfo.ctg_id,
                    title: res.data.authInfo.auth_title,
                    description: res.data.authInfo.auth_description,
                }
            });
        });
    }

    useEffect(() => {
        window.localStorage.setItem("myAddress", JSON.stringify(myAddress));
        const body = { address: myAddress, auth_status: ['01', '02']}
        const result = axios.post('/api/select-all-auth', body)
            .then(res => {
                console.log("대기 중인 인증서");
                console.log(body);
                console.log(res.data.authInfo);
                setNfts(res.data.authInfo);
            });
        // const _nfts = await selectAllNFT(myAddress);
        // setNfts(_nfts);

    }, [myAddress]);

    useEffect(() => {
        window.localStorage.setItem("myAddress", JSON.stringify(myAddress));
        const body = { address: myAddress, auth_status: ['03'] }
        const result = axios.post('/api/select-all-auth', body)
            .then(res => {
                console.log("인증 받은 NFT");
                console.log(body);
                console.log(res.data.authInfo);
                setMintNfts(res.data.authInfo);
            });
        // const _nfts = await selectAllNFT(myAddress);
        // setNfts(_nfts);

    }, [myAddress]);

    const NFTCardItems = nfts.map((item, i) => {
        return (
            <div key={i} style={{ marginRight: 30 }}>
                {item.auth_status === "01" ? (
                    <div>
                        <button className="wallet_card_collection_image_wating">
                            <div className="wallet_card_collection_item_wating">대기중</div>
                        </button>
                    </div>
                ) : 

                item.ctg_id === "company" ? (
                    <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#F6C7A5" }}
                        onClick={() => { goMintView(item._id) }}>
                        <div className="wallet_card_collection_item_wating">인증 완료</div>
                        <div className="wallet_card_collection_item_wating">발행하기</div>
                    </button>)
                : item.ctg_id === "school" ? (
                    <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#A5C5F6" }}
                        onClick={() => { goMintView(item._id) }}>
                        <div className="wallet_card_collection_item_wating">인증 완료</div>
                        <div className="wallet_card_collection_item_wating">발행하기</div>
                    </button>)
                : item.ctg_id === "award" ? (
                    <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#F6A5A5" }}
                        onClick={() => { goMintView(item._id) }}>
                        <div className="wallet_card_collection_item_wating">인증 완료</div>
                        <div className="wallet_card_collection_item_wating">발행하기</div>
                    </button>)
                : (
                    <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#A5A6F6" }}
                        onClick={() => { goMintView(item._id) }}>
                        <div className="wallet_card_collection_item_wating">인증 완료</div>
                        <div className="wallet_card_collection_item_wating">발행하기</div>
                    </button>)
                }

                <div className="wallet_card_collection_item_title">
                    {item.auth_title}
                </div>
            </div>
        );
    });

    const NFTMintCardItems = mintnfts.map((item, i) => {
        return (
            <div key={i} style={{ marginRight: 30 }}>
                <div>
                    <div>
                        <img className="wallet_card_mint_nft_certi" src="image/metapofol_mint_badge.png" ></img>
                        {item.ctg_id === "company" ? (
                            <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#F6C7A5" }}
                                onClick={() => { goNFTDetailView(item._id) }}>
                                <div className="wallet_card_collection_item_wating">직업 인증</div>
                                <div className="wallet_card_collection_item_wating">{item.auth_title}</div>
                            </button>)
                        : item.ctg_id === "school" ? (
                            <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#A5C5F6" }}
                                onClick={() => { goNFTDetailView(item._id) }}>
                                <div className="wallet_card_collection_item_wating">학력 인증</div>
                                <div className="wallet_card_collection_item_wating">{item.auth_title}</div>
                            </button>)
                        : item.ctg_id === "award" ? (
                            <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#F6A5A5" }}
                                onClick={() => { goNFTDetailView(item._id) }}>
                                <div className="wallet_card_collection_item_wating">수상 인증</div>
                                <div className="wallet_card_collection_item_wating">{item.auth_title}</div>
                            </button>)
                        : (
                            <button className="wallet_card_collection_image_certi" style={{ backgroundColor: "#A5A6F6" }}
                                onClick={() => { goNFTDetailView(item._id) }}>
                                <div className="wallet_card_collection_item_wating">기타 인증</div>
                                <div className="wallet_card_collection_item_wating">{item.auth_title}</div>
                            </button>)
                        }
                    </div>
                </div>
                <div className="wallet_card_collection_item_title">
                    {item.auth_title}
                </div>
            </div>
        );
    });

    return (
        <div>
            <section>
                <div className="Wallet wallet_body">
                    <div className="account_title">
                        Account1
                    </div>
                    <div className="account_address_container" style={{ marginTop: 30 }}>
                        <div className="account_address_inner" >
                            <div className="d-flex flex-row justify-content-around">
                                <div className="row d-flex flex-column justify-content-center align-items-center" >
                                    <img src="image/wallet_my_address.png" style={{ marginBottom: 10 }} />
                                    내주소
                                </div>
                                <div className="row d-flex flex-column justify-content-center align-items-center" >
                                    <img src="image/wallet_qrcode.png" style={{ marginBottom: 10 }} />
                                    스캔
                                </div>
                            </div>

                            <div className="d-flex align-items-center flex-column" style={{ marginTop: 20 }}>
                                <div className="d-flex flex-row">
                                    <div className="p-2" >
                                        지갑주소 :
                                    </div>
                                    <div className="p-2" >
                                        <div className="account_address_label">
                                            {myAddress}
                                        </div>
                                    </div>
                                    <div className="p-2" >
                                        <img src="image/wallet_address_copy.png" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="p-2" style={{ marginLeft: 10, marginTop: 10, fontSize: 20 }} >
                                        KLAY : {myBalance}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wallet_card_collection">
                            <div className="wallet_card_collection_title">
                                대기 중인 인증서
                                <div className="wallet_card_collection_item">
                                    {NFTCardItems}
                                </div>
                            </div>
                        </div>

                        <div className="wallet_card_collection" style={{ marginTop: 10 }}>
                            <div className="wallet_card_collection_title" >
                                인증 받은 NFT
                                <div className="wallet_card_collection_item">
                                    {NFTMintCardItems}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>

    );
}
export default MetaPofolWallet;