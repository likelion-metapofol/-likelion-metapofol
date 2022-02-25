import axios from "axios";
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, CHAIN_ID } from '../constants';
const option = {
    headers: {
        Authorization: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
        "x-chain-id": CHAIN_ID,
        "content-type": 'application/json',
    }
}
export const uploadMetaData = async (_name, _description, imageUrl) => {
    const metadata = {
        metadata: {
            name: _name,
            description: _description,
            image: imageUrl
        }
    }
    try {
        const response = await axios.post('https://metadata-api.klaytnapi.com/v1/metadata', metadata, option);
        return response.data.uri;
    }catch(e) {
        console.log(`API 조회 오류 로그${e}`);
        return false;
    }
}
