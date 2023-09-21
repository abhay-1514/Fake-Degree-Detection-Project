import { useState } from "react";
const StudentDetails = ({state})=>{

    const addStudent = async(event)=>{
        event.preventDefault();
        const {contract,account} = state;
        const studentName = document.querySelector("#name").value;
        const studentRoll = document.querySelector("#rollNo").value;
        const studentMarks = document.querySelector("#marks").value;

        try{
            const res = await fetch("http://localhost:3000/api/ethereum/add-student-details",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({studentRoll:studentRoll})
            })
            const data = await res.json();
            console.log(data)
        }catch(error){

        }
    }
    return<>
    <form onSubmit={addStudent}>
        <label>
            Name:
            <input id="name"/>
        </label>
        <label>
            Roll Number:
            <input id="rollNo" type="number"/>
        </label>
        <label>
            Marks:
            <input id="marks" type="number"/>
        </label>
        <button type="submit">Add Student</button>
    </form>
    </>
}
export default StudentDetails;