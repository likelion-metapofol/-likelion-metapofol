import React, { useState, useEffect } from 'react'
import { Alert, Container, Card, Nav, Form, Button, Modal, Row, Col } from 'react-bootstrap';

function Event() {
  const DEFAULT_ADDRESS = '0x00000000000000000000000000000';
  const [nfts, setNfts] = useState([]);
  const [oneNft, setOneNft] = useState([]);
  const [myBalance, setMyBalance] = useState('0');
  const [myAddress, setMyAddress] = useState('0x00000000000000000000000000000');
  const [mintImageUrl, setMintImageUrl] = useState('');
  const [mintTokenId, setMintTokenId] = useState('');
  const [mintName, setMintName] = useState('');
  const [mintDescription, setMintDescription] = useState('');
  const rows = nfts.slice(nfts.length / 2);
  
  /*
  * @Description 함수 목록
  * NFT발행하기(onClickMint)
  * NFT전체조회하기(onClickAllNFT(myAddress))
  * NFT상세조회하기(onClickOneNFT(myAddress, tokenId))
  * 지갑연동하기(getUserData)
  */ 
  // NFT발행하기(mintNFT)
  const onClickMint = async (name, description, uri, tokenId) => {}

  // NFT전체조회하기(onClickAllNFT(myAddress))
  const onClickAllNFT = async () => {}

  // NFT상세조회하기(onClickOneNFT(myAddress, tokenId))
  const onClickOneNFT = async (tokenId) => {}
  
  // 지갑연동하기(getUserData)
  const getUserData = () => {}

  return (
    <div>
      <div style={{ backgroundColor: 'white', padding: 10 }}>
        {/* 주소 */}
        <div style={{width:'100%', height:'20px', fontSize: 12, textAlign: 'left', marginLeft:10, fontWeight: 'bold'}}>주소 가져오기: {myAddress}</div><br/>
        {/* 잔고 */}
        <div style={{width:'100%', height:'20px', fontSize: 12, textAlign: 'left', marginLeft:10, fontWeight: 'bold'}}>클레이튼 가져오기:  {myBalance} KLAY</div>
        <div style={{width:'100%', height:'20px', fontSize: 12, textAlign: 'left', marginLeft:10, fontWeight: 'bold'}}>
          <button onClick={() => { getUserData(); }}
                    variant='balance'
          >지갑연동하기
          </button>
        </div>
        <hr/>
        {/* 발행하기 */}
        <div style={{width:'100%', fontSize: 12, textAlign: 'left', marginLeft:10, fontWeight: 'bold'}}>발행하기<br/>
          제목: &nbsp;
          <input value={mintName} 
                 onChange={(e) => {
                    setMintName(e.target.value);
                 }}
                 type='text'
                 placeholder='NFT 제목을 입력해주세요'
                 style={{width:'80%', height:'100%', marginBottom:10, marginTop:10, borderRadius: '5px'}}
          >
          </input>
          <br />
          설명: &nbsp;
          <input value={mintDescription}
                 onChange={(e) => {
                    setMintDescription(e.target.value);
                 }}
                 type='text'
                 placeholder='NFT 설명을 입력해주세요'
                 style={{width:'80%', height:'100%', marginBottom:10, borderRadius: '5px'}}
          >
          </input>
          <br />
          이미지 주소: &nbsp;
          <input value={mintName} 
                 value={mintImageUrl}
                 onChange={(e) => {
                   setMintImageUrl(e.target.value);
                 }}
                 type='text'
                 placeholder='이미지 주소를 입력해주세요'
                 style={{width:'70%', height:'100%', marginBottom:10, borderRadius: '5px'}}
          >
          </input>
          <br />
          토큰 ID: &nbsp;
          <input value={mintTokenId}
                 onChange={(e) => {
                   setMintTokenId(e.target.value);
                 }}
                 type='text'
                 placeholder='토큰 ID를 입력해주세요'
                 style={{width:'75.5%', height:'100%', marginBottom:10, borderRadius: '5px'}}
          >
          </input>
          <br />
          <button onClick={() => { onClickMint(mintName, mintDescription, mintImageUrl, mintTokenId); }}
                  variant='primary'
                  id='mint'
          >발행하기
          </button>
        </div>
        <hr/>
        <div style={{width:'100%', fontSize: 12, textAlign: 'left', marginLeft:10, fontWeight: 'bold'}}>NFT 공간<br/>
          <div>
            {rows.map((nft, rowIndex) => (
              <Row>
                <Col style={{marginRight: 0, paddingRight: 0}}>
                  <Card style={{width:'80%', height:'60%'}} onClick={() => {
                    onClickOneNFT(nfts[rowIndex * 2].id);
                  }}>
                    <Card.Img src={nfts[rowIndex * 2].uri} />
                  </Card>
                  [{nfts[rowIndex * 2].id}]NFT
                </Col>
                <Col style={{marginRight: 0, paddingRight: 0}}>
                  {
                    nfts.length > rowIndex * 2 + 1 ? (
                      <Card style={{width:'80%', height:'60%'}} onClick={() => {
                        onClickOneNFT(nfts[rowIndex * 2 + 1].id);
                      }}>
                        <Card.Img src={nfts[rowIndex * 2 + 1].uri} />
                      </Card>
                    ) : null
                  }
                  {
                    nfts.length > rowIndex * 2 + 1 ? (
                      <>[{nfts[rowIndex * 2 + 1].id}]NFT</>
                    ) : null
                  }
                </Col>
              </Row>
            ))}
          </div>
          <button onClick={() => { onClickAllNFT(); }}>조회하기</button>
        </div>
        <hr/>
        <div style={{width:'100%', fontSize: 12, textAlign: 'left', marginLeft:10, fontWeight: 'bold'}}>상세 NFT<br/>
          <div>
            {oneNft.map((nft, index) => (
              <Row>
                <Col style={{marginRight: 0, paddingRight: 0}}>
                  <Card style={{width:'80%', height:'60%'}}>
                    <Card.Img src={nft.uri} />
                  </Card>
                  제목: {nft.name} <br/>
                  설명: {nft.description} <br/>
                  토큰ID: {nft.id} 
                </Col>
              </Row>
            ))}
          </div>
        </div>     
      </div>
    </div>
  )
}

export default Event
