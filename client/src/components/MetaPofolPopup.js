import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./MetaPofolPopup.css";
import QRCode from "qrcode.react";
import * as KlipAPI from "../api/UseKlip";
import { getBalance, fetchCardsOf } from "../api/UseCaver";

const DEFAULT_QR_CODE = "DEFAULT";

function MetaPofolPopup({ popupType, onClose, onCancel, setaddress }) {

    const navigate = useNavigate();
    const [qrvalue, setQrvalue] = useState(setaddress);
    
    const { id } = useParams();

    const close = (e) => {
        if (onClose) {
            onClose(e)
        }
    }

    const cancel = (e) => {
        if (onClose) {
            onCancel(e)
        }
    }

    var caseUI = {
        "CERTIFICATE_REGISTRATION":  // NFT 발행 완료 팝업 내역보기 누르면 지갑으로 이동
            <div>
                <div className='popup_inner_title'>
                    인증서가 제출 되었습니다.
                    24시간 후에 확인하세요
                </div>
                <div className='popup_inner_button1' onClick={close}>
                    <div className="popup_inner_button_title">
                        <div>내역보기</div>
                    </div>
                </div>

                <div className='popup_inner_button' onClick={cancel}>
                    <div className="popup_inner_button_title">
                        <div>돌아가기</div>
                    </div>
                </div>
            </div>
        ,
        "MINT_COMPLETE":  // NFT 발행 완료 팝업 내역보기 누르면 지갑으로 이동
            <div>
                <div className='popup_inner_title'>
                    NFT 발행이 완료되었습니다.
                </div>
                <div className='popup_inner_button' onClick={close}>
                    <div className="popup_inner_button_title">
                        <div>내역보기</div>
                    </div>
                </div>
            </div>
        ,
        "OVERDRAWN_COIN":  // NFT 발행 시 잔액 부족
            <div>
                <div className='popup_inner_title'>
                    잔액이 부족합니다
                    KLAY를 충전하세요
                </div>
                <div className='popup_inner_button' onClick={close}>
                    <div className="popup_inner_button_title">
                        <div>내역보기</div>
                    </div>
                </div>
            </div>
        ,
        "WALLET_NOT_YET": // 지갑 연동 전 클릭 시 보여줄 팝업
            <div>
                <div className='popup_inner_title'>
                    Klaytn Wallet을 연동하세요.
                </div>
                <div className='popup_inner_button' onClick={close}>
                    <div className="popup_inner_button_title">
                        <div>확인</div>
                    </div>
                </div>
            </div>
        ,
        "WALLET_CONNECT":
            <div>
                <div className='popup_inner_qrcode' >
                    <QRCode value={qrvalue} />
                </div>
                <div className='popup_inner_button' onClick={close}>
                    <div className="popup_inner_button_title">
                        <div>확인</div>
                    </div>
                </div>
            </div>
    }

    return (
        <div className='popup'>
            <div className='popup_inner'>
                {caseUI[popupType]}
            </div>
        </div>
    );
}
export default MetaPofolPopup;