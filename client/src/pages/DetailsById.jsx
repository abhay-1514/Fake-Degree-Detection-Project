import { useState } from "react";
const DetailsById = ()=>{
    const [detobj,setobj]=useState([]);
    const viewDetails = async(event)=>{
        try{
            event.preventDefault()
            const detailsID = document.querySelector("#detailsId").value;
            const res = await fetch(`http://localhost:3000/api/ethereum/get-student-details-by-index/${detailsID}`,{
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
            <input id="detailsId" />
        </label>
        <button type="submit">View Details</button>
    </form>
    </>
}
export default DetailsById;