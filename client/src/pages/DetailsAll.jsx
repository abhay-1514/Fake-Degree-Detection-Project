import { useState,useEffect } from "react";
const DetailsAll = ()=>{
    const [studentDetailsArray,setDetailsList] = useState([])
    useEffect(()=>{
        const allDetails = async()=>{
            try{
                const res = await fetch("http://localhost:3000/api/ethereum/all-details",{
                    method:"GET",
                    headers:{
                        "content-type":"application/json"
                    }
                })
                const data = await res.json();
                if(data.status===200){
                    console.log(data.studentDetailsArray)
                    setDetailsList(data.studentDetailsArray)
                }
            }catch(error){
                console.error(error)
            }
        }
        allDetails();
    },[])
    return<></>
}
export default DetailsAll;