import React, { useState } from 'react'
import axios from "axios";

function Detail() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value); // e.target.value
  }

  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value); // e.target.value
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      title: title,
      description, description
    }
    axios.post('/api/user', body)
    .then(res => {
      console.log(res);
    });
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>NFT 제목</label>
        <input type="title" value={title} onChange={onTitleHandler}/>
        <label>NFT 설명</label>
        <input type="description" value={description} onChange={onDescriptionHandler}/>
        <br/>
        <button>인증정보 저장</button>
      </form>
    </div>
  )
}

export default Detail
