import Navigation from '../Components/Navigation'; 
import { useState } from "react";
const StudentDetails = ({ state }) => {
  const [modalOpen,setModalOpen] = useState(false);
  const [modalContent,setModalContent] = useState("");

const closeModal = ()=>{
    setModalOpen(false);
    setModalContent("");
};

  const addStudent = async (event) => {
    event.preventDefault();
    const { contract, account } = state;
    const studentName = document.querySelector("#name").value;
    const studentRoll = document.querySelector("#rollNo").value;
    const studentMarks = document.querySelector("#marks").value;

    try {
      const res = await fetch(
        "http://localhost:3000/api/ethereum/add-student-details",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ studentRoll: studentRoll }),
        }
      );
      const data = await res.json();
      if(data.status===200){
        if(contract && contract.methods){
          await contract.methods.registrarAdvice(studentRoll,studentName,studentMarks).send({from:account})
          setModalContent(`Student ${studentName} added at ${studentRoll} Roll Number`);
        }
      }else{
          alert("Student Details cannot be Added")
        }
    } catch (error) {
      console.error(error)
      setModalContent(`Student Already exists at Roll Number ${studentRoll}`)
    }finally{
      setModalOpen(true);
    }
  };
  return (
    <>
      <Navigation />
      <div className='create_task todo_btn'>
      <form onSubmit={addStudent}>
        <label>
          Roll Number:
          <input id="rollNo" />
        </label>
        <label>
          Name:
          <input id="name" />
        </label>
        <label>
          Marks:
          <input id="marks" />
        </label>
        <button type="submit">Add Student Details</button> 
      </form>
      {modalOpen && (
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
  );
};
export default StudentDetails;
