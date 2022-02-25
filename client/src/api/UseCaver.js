import axios from "axios";
import Caver from 'caver-js';
import MetaPopleABI from '../abi/MetaPofolABI.json';
import { NFT_CONTRACT_ADDRESS, ACCESS_KEY_ID, SECRET_ACCESS_KEY, CHAIN_ID} from '../constants';

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}
  
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const NFTContract = new caver.contract(MetaPopleABI, NFT_CONTRACT_ADDRESS);; 
  
export const selectAllNFT = async (address) => {
  const balance = await NFTContract.methods.balanceOf(address).call();
  const tokenIds = [];
  for (let i=0;i<balance;i++) {
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }
  const tokenURIs = [];
  const tokenDescription = [];
  const tokenName = [];
  for (let i=0;i<balance;i++) {
    const matadataUrl = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    const response = await axios.get(matadataUrl);
    const uriJSON = response.data;
    tokenURIs.push(uriJSON.image);
    tokenDescription.push(uriJSON.description);
    tokenName.push(uriJSON.name);
  }
  const nfts = [];
  for (let i=0;i<balance;i++) {
    nfts.push({ 
      uri: tokenURIs[i], 
      id: tokenIds[i],
      description: tokenDescription[i],
      name: tokenName[i],
    });
  }
  return nfts;
}

export const selectOneNFT = async (address, tokenId) => {

  const matadataUrl = await NFTContract.methods.tokenURI(tokenId).call();
  const response = await axios.get(matadataUrl);
  const uriJSON = response.data;
  const nfts = [];
  nfts.push({ 
    uri: uriJSON.image, 
    id: tokenId,
    description: uriJSON.description,
    name: uriJSON.name
  });
  return nfts;
}

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    return balance;
  });
}
