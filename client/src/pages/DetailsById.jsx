import Navigation from '../Components/Navigation';
import { useState } from "react";
const DetailsById = ()=>{
    const [detobj,setobj]=useState({numroll:null,name:null,nummarks:null,
        deenPermission:null,registrarPermission:null,VCPermission:null,
        hashcode:null});
        const [modalVisible,setModalVisible] = useState(false);
    const [modalContent,setModalContent] = useState("");
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
            setModalContent("Invalid ID: Student Details Doesn't Exists");
            setModalVisible(true);
        }
    }
    const closeModal = ()=>{
        setModalVisible(false);
        setModalContent("");
    }
    return<>
    <Navigation/>
    <div className='view_task todo_btn'>
    {detobj.numroll!==null && detobj.name!==null && detobj.nummarks!==null 
    && detobj.deenPermission!==null && detobj.registrarPermission!==null 
    && detobj.VCPermission!==null && detobj.hashcode!==null ? (
          <div className="view_task_by_id  view_all_tasks_card">
            <p>Roll No: {detobj.numroll}</p>
            <p>Name: {detobj.name}</p>
            <p>Marks: {detobj.nummarks}</p>
            <p>Chancellor: {detobj.deenPermission}</p>
            <p>Registrar: {detobj.registrarPermission}</p>
            <p>Vice Chancellor: {detobj.VCPermission}</p>
            <p>Hash: {detobj.hashcode}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
    <form onSubmit={viewDetails}>
        <label>
            ID:
            <input id="detailsId" />
        </label>
        <button type="submit">View Details</button>
    </form>
    {modalVisible && (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={closeModal}>
                    &times;
                </span>
                <p>{modalContent}</p>
            </div>
            </div>
    )}
    </div>
    </>
}
export default DetailsById;