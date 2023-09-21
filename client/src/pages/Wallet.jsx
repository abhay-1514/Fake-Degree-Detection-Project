//import PropTypes from 'prop-types';
import Web3 from "web3";
import ABI from "./ABI.json";
import { useNavigate } from 'react-router-dom';
const Wallet = ({saveState})=>{
    const navigateTo = useNavigate();
    const connectWallet = async()=>{
        try{
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method:"eth_requestAccounts"
                })
                const contractAddress = "0x0aead1aa1dd33d2351bd8daeb73cad3a193fddd5";
                const contract = new web3.eth.Contract(ABI,contractAddress);
                saveState({web3:web3,contract:contract,account:accounts[0]})
                navigateTo("/all-details")
            }else{
                throw new Error("Wallet Not Found");
            }
        }catch(error){
            console.error(error)
        }
    }
    return<><button onClick={connectWallet}>Connect Wallet</button>
    </>
}
export default Wallet;  