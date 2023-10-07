// contract address = 0x8ff6611ba6ec27f5608F568c7529E56Da52E209f

const express = require ('express')
const cors = require("cors")
const ABI = require ("./ABI.json");
const {Web3} = require("web3");
const PORT = 3000;

const app = express();
app.use(cors())
app.use(express.json())

//QuickNode
//const web3 = new Web3("https://palpable-proud-meme.ethereum-sepolia.discover.quiknode.pro/626991c319722a29138013fe2b9d9d2083bde9fe/");

//ALchemy
const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/B_FJGxu2hoxkPt24m5_I3c3lpyHKr1_e");

//Infura
//const web3 = new Web3("https://sepolia.infura.io/v3/5ec3befe5caf406fb96a164b3fc16128");

//Moralis
//const web3 = new Web3("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjRjNDk3MjIyLWQ4NDMtNDEzYS1iNDE2LTk1Mjc4YWM2YTFiYSIsIm9yZ0lkIjoiMzYwMjI0IiwidXNlcklkIjoiMzcwMjEzIiwidHlwZUlkIjoiZTljMzYwNDktZDU3YS00NzQyLTgwNWUtMzBjZTk5YTdiYmJhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTY2OTk3OTksImV4cCI6NDg1MjQ1OTc5OX0.gBC6Q5EFBNbPqXWBYrK0aWQqXTxVQbxv8-OT1x8isKA");
const contractAddress = "0x8ff6611ba6ec27f5608F568c7529E56Da52E209f";
const contract = new web3.eth.Contract(ABI,contractAddress);
//console.log(contract)

const roll_clash_check = async(studentRoll)=>{
    const details = await contract.methods.getAllStudentDetails().call();
    const found_details = details.find(details=>details.rollNo===studentRoll);

    if(found_details){
        return found_details.name;
    }
    return "No Details Found";
}

app.post("/api/ethereum/add-student-details",async(req,res)=>{
    const {studentRoll} = req.params;
    const details = await roll_clash_check(studentRoll);
    try{
        if(details==="No Details Found"){
            res.status(200).json({status:200,message:"Student Details can be added"})
        }else{
            res.status(409).json({status:409,message:"Roll No Already In Use:Student Details cannot be added"})
        }
    }catch(error){
        console.error(error)
    }
})

app.get("/api/ethereum/get-student-details-by-index/:detailsid",async (req,res)=>{
    try{
        const {detailsid} = req.params;
        const details = await contract.methods.getStudentDetailsByIndex(detailsid).call();
        const{rollNo,name,marks,deenPermission,registrarPermission,VCPermission,hashcode}=details;
        const numroll = Number(rollNo)
        const nummarks = Number(marks)
        const detobj ={
            numroll,name,nummarks,deenPermission,registrarPermission,VCPermission,hashcode
        }
        res.status(200).json({status:200,detobj,message:"Details Exist"})
    }catch(error){
        res.status(500).json({status:500,message:"Details ID doesn't Exist"})
        console.error(error)
    }
});

app.get("/api/ethereum/details-by-hash/:hash",async (req,res)=>{
    try{
        const {hash} = req.params;
        const detailsbyhash = await contract.methods.getStudentDetailsByHash(hash).call();
        const{rollNo,name,marks,deenPermission,registrarPermission,VCPermission,hashcode}=detailsbyhash;
        const numroll = Number(rollNo)
        const nummarks = Number(marks)
        const detobj ={
            numroll,name,nummarks,deenPermission,registrarPermission,VCPermission,hashcode
        }
        res.status(200).json({status:200,detobj,message:"Details Exist"})
    }catch(error){
        res.status(500).json({status:500,message:"Details ID doesn't Exist"})
        console.error(error)
    }
});

app.get("/api/ethereum/all-details", async (req, res) => {
    try {
        const details_all = await contract.methods.getAllStudentDetails().call();
        if (!details_all || details_all.length === 0) {
            return res.status(404).json({ status: 404, message: "No Details Found" });
        }else{
        const studentDetailsArray = [];
        details_all.forEach(studentData => {
            const [rollNo, name, marks, deenPermission, registrarPermission, VCPermission, hashcode] = studentData;
            const detobj1 = {
                numroll: Number(rollNo),
                name,
                nummarks: Number(marks),
                deenPermission,
                registrarPermission,
                VCPermission,
                hashcode,
            };
            studentDetailsArray.push(detobj1);
        });
        res.status(200).json({ status:200, studentDetailsArray, message: "Details Exist" });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});

app.listen(PORT,()=>{
    console.log(`Server Running at Port ${PORT}`)
})