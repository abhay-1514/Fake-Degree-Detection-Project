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
                const contractAddress = "0x8ff6611ba6ec27f5608F568c7529E56Da52E209f";
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
    return<>
    <div className="wallet_header">
        <span>Fake Degree</span> <p>PREVENTION SYSTEM</p>
    </div>
    <div className="connect_wallet_section todo_btn">
        <p>Please connect the metamask wallet to access the App</p>
        <button onClick={connectWallet}>Connect Wallet</button>
    </div>
    </>
}
export default Wallet;  