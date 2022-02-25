const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Auth } = require('./models/Auth');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://terry:1234@metapofolcluster.uvyqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {})
        .then(() => console.log('MongoDB connected'))
        .catch((err) => { console.log(err); });

app.get('/', (req, res) => res.send('Hello!'));

// 인증정보 저장
app.post('/api/insert-auth', (req, res) => {
  const auth = new Auth(req.body);
  auth.save((err, authInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
});

// 인증정보 리스트 조회(인증상태 01, 02만 조회)
app.post('/api/select-all-auth', (req, res) => {
  Auth.find({ address: req.body.address, auth_status: { '$in': req.body.auth_status }}, (err, authInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
      authInfo: authInfo
    })
  })
});

// 인증정보 상세 조회
app.post('/api/select-one-auth', (req, res) => {
  Auth.findOne({ _id: req.body._id }, (err, authInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
      authInfo: authInfo
    })
  })
});

// 인증상태 update(인증상태가 02인 NFT를 민팅시 03으로 업데이트)
app.patch('/api/update-auth_status', async (req, res) => {
  await Auth.findOneAndUpdate({_id: req.body._id}, {
    auth_status: '03',
  })
  .then((result) => {
      res.json(result);
  });
});

const port = 1000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});