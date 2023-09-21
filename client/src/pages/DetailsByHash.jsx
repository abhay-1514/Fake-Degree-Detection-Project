import { useState } from "react";
const DetailsByHash = ()=>{
    const [detobj,setobj]=useState([]);
    const viewDetails = async(event)=>{
        try{
            event.preventDefault()
            const Hash = document.querySelector("#hash").value;
            const res = await fetch(`http://localhost:3000/api/ethereum/details-by-hash/${Hash}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            });
            const data = await res.json();
            if(data.status===200){
                setobj(data.detobj)
            }else{
                throw new Error;
            }
            console.log(data)
        }catch(error){
            console.error(error)
        }
    }
    return<>
    <form onSubmit={viewDetails}>
        <label>
            ID:
            <input id="hash"/>
        </label>
        <button type="submit">View Details</button>
    </form>
    </>
}
export default DetailsByHash;