import React, { useState , useEffect} from "react";
import "./MetaPofol.css";
import { Button } from 'react-bootstrap';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import MetaPofolPopup from '../components/MetaPofolPopup';

const handleImageUpload = (e) => {
    const fileArr = e.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
        file = fileArr[i];

        let reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            fileURLs[i] = reader.result;
        };
        reader.readAsDataURL(file);
    }

};

const MetaPofolCertificate = () => {
    const navigate = useNavigate();

    const [radio, setRadio] = useState('');
    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalProps, setModalProps] = useState({
        title: "MODAL", 
    });
    const [myAddress, setMyAddress] = useState(
        () => JSON.parse(window.localStorage.getItem("myAddress")) || 0 
     );
  
     const [myBalance, setMyBalance] = useState(
        () => JSON.parse(window.localStorage.getItem("myBalance")) || 0
     );
  

    const goMyWallet = () => {
        // 인증 테이블 저장 데이터
        // const body = {
        //     // 주소
        //     address: myAddress,
        //     // 상태 (대기중:'01'/인증완료:'02'/발급완료:'03')
        //     auth_status: '01',
        //     // 카테고리ID
        //     ctg_id: radio,
        //     // 제목
        //     auth_title: title,
        //     // 설명
        //     auth_description: description,
        //     // 이미지 파일1
        //     image_file1: imageSrc
        // }
        // axios.post('/api/insert-auth', body)
        // .then(res => {
            console.log("goMyWallet")
            setShowModal(false);
            navigate('../metapofolwallet');
        // });
        
    }
    const goBack = () => {
        console.log("goBack")
        setShowModal(false);
        navigate('../metapofolmarket');
        //navigate(-1);
    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result); resolve();
            };
        });
    };

    // form data DB insert
    const onSubmitHandler = (event) => {
        event.preventDefault();
        // 인증 테이블 저장 데이터
        const body = {
            // 주소
            address: myAddress,
            // 상태 (대기중:'01'/인증완료:'02'/발급완료:'03')
            auth_status: '01',
            // 카테고리ID
            ctg_id: radio,
            // 제목
            auth_title: title,
            // 설명
            auth_description: description,
            // 이미지 파일1
            image_file1: imageSrc
        }
        axios.post('/api/insert-auth', body)
        .then(res => {
            console.log(res);
        });
    }

    const ctgHandleChange = (e) => {
        setRadio(e.target.value);
    }


    return (
        <section>
            <p className='certip'>인증 확인 절차</p>
            <p className="certismall">카테고리</p>
            {/* <div>
                <label><input type="radio" name="btn" value="company" id="b1" className="btnRadio" /> 직장인증</label>
                <label><input type="radio" name="btn" value="award" id="b2" className="btnRadio" /> 수상 경력 인증</label>
                <label><input type="radio" name="btn" value="school" id="b3" className="btnRadio" /> 학력 인증</label>
                <label><input type="radio" name="btn" value="etc" id="b4" className="btnRadio"/> 기타 인증</label>
                <br /><br /><br /><br />
            </div> */}
            {/* <form onSubmit={onSubmitHandler}> */}
            <form>
                <div>
                    <label><input type="radio" name="ctgValue" value="company" id="b1" className="btnRadio" onChange={ctgHandleChange}/> 직장인증</label>
                    <label><input type="radio" name="ctgValue" value="award" id="b2" className="btnRadio" onChange={ctgHandleChange}/> 수상 경력 인증</label>
                    <label><input type="radio" name="ctgValue" value="school" id="b3" className="btnRadio" onChange={ctgHandleChange}/> 학력 인증</label>
                    <label><input type="radio" name="ctgValue" value="etc" id="b4" className="btnRadio"onChange={ctgHandleChange}/> 기타 인증</label>
                    <br /><br /><br /><br />
                </div>
                <p className="certismall">제목</p>
                <input type="title" name="title" value={title} className="titlep" onChange={(e) => { setTitle(e.target.value);  }} />
                <br /><br />
                <p className="certismall">설명</p>
                <input type="description" name="description" value={description} className="explp" onChange={(e) => { setDescription(e.target.value); }} />

                <p className="certismall">인증 파일 첨부</p>
                <label className="input-file-button" for="input-file">파일 찾기</label>
                <input type={"file"} id="input-file" style={{ display: "none" }} multiple onChange={(e) => { encodeFileToBase64(e.target.files[0]); }} />
                <div className="preview"> {imageSrc && <img src={imageSrc} alt="preview-img" />} </div>
                <div className="expltext1">
                    <br />
                    1. 직장 인증 : 재직 증명서, 명함<br />
                    2. 학교 인증 : 학생증, 재학 증명서, 졸업 증명서<br />
                    3. 수상 경력 인증 : 상장 첨부 <br />
                    4. 기타 사항(사용자 입력) : 성적 증명서, 등기부등본, 신분증 등등<br /><br />
                </div>
                <button className='button4' onClick={() => {setShowModal(true)}} >인증 받기</button>
            </form>
            {/* <p className="certismall">제목</p>
            <input type="title" name="title" value={text} className="titlep" onChange={(e) => { setText(e.target.value);  }} />
            <br /><br />
            <p className="certismall">설명</p>
            <input type="description" name="expl" value={text2} className="explp" onChange={(e) => { setText2(e.target.value); }} /> */}

            {/* <p className="certismall">인증 파일 첨부</p>
            <label className="input-file-button" for="input-file">파일 찾기</label>
            <input type={"file"} id="input-file" style={{ display: "none" }} multiple onChange={(e) => { encodeFileToBase64(e.target.files[0]); }} />
            <div className="preview"> {imageSrc && <img src={imageSrc} alt="preview-img" />} </div>
            <div className="expltext1">
                <br />
                1. 직장 인증 : 재직 증명서, 명함<br />
                2. 학교 인증 : 학생증, 재학 증명서, 졸업 증명서<br />
                3. 수상 경력 인증 : 상장 첨부 <br />
                4. 기타 사항(사용자 입력) : 성적 증명서, 등기부등본, 신분증 등등<br /><br />
            </div>
            <button className='button4'>인증 받기</button> */}
            <br /><br /><br /><br /><br />
            {showModal && <MetaPofolPopup popupType="CERTIFICATE_REGISTRATION" onClose={goMyWallet} onCancel={goBack} ></MetaPofolPopup>}

            {/* <Modal 
                centered
                size="sm"
                show={showModal}
                onHide={() =>{
                    setShowModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalProps.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>인증서가 제출 되었습니다</p>
                    <p>24시간 후에 확인하세요</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" 
                        onClick = {() => {
                            goMarketView();
                            setShowModal(false);
                            }}>
                                돌아가기
                    </Button>
                    <Button variant="primary" 
                        onClick = {() => {
                            goMyWallet();
                            setShowModal(false);
                            }}>
                                내역보기
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </section>
        
    );


}


export default MetaPofolCertificate;