import Navigation from '../Components/Navigation';
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
    return<>
    <Navigation/>
    <div className='view_all_tasks'>
    {studentDetailsArray.map((student, index) => (
        <div className='view_all_tasks_card' key={index}>
            <p>Roll No: {student.numroll}</p>
            <p>Name: {student.name}</p>
            <p>Marks: {student.nummarks}</p>
            <p>Chancellor: {student.deenPermission}</p>
            <p>Registrar: {student.registrarPermission}</p>
            <p>Vice Chancellor: {student.VCPermission}</p>
            <p>Hashcode: {student.hashcode}</p>
        </div>
    ))}
    </div>
    </>
}
export default DetailsAll;