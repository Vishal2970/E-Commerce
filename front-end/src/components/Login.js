import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate= useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[])

    const handlelogin=async()=>{
        let result= await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result=await result.json();
        // if(result.name){                   //////////////////// before applying token
        //     localStorage.setItem('user',JSON.stringify(result));
        //     navigate('/');
        // }

        if(result.auth){                     //////////////// after applying token
            localStorage.setItem('user',JSON.stringify(result.result));                 ////////////////  we will get output like this result inside result   {result: {_id: "63a2f72a9766c5d5c20d8b95", name: "deepak", email: "deepak@test.com", __v: 0},…} auth : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiX2lkIjoiNjNhMmY3MmE5NzY2YzVkNWMyMGQ4Yjk1IiwibmFtZSI6ImRlZXBhayIsImVtYWlsIjoiZGVlcGFrQHRlc3QuY29tIiwiX192IjowfSwiaWF0IjoxNjcyMDYzNjI5LCJleHAiOjE2NzIwNzA4Mjl9.bFk0Go_ssEchhbYW9ybUIXe41kijI4kPVjaVMXQxv_4" result : {_id: "63a2f72a9766c5d5c20d8b95", name: "deepak", email: "deepak@test.com", __v: 0} email : "deepak@test.com" name : "deepak" __v : 0 _id : "63a2f72a9766c5d5c20d8b95"
            localStorage.setItem('token',JSON.stringify(result.auth));           //// storing token also in token variable
            navigate('/');
        }
        else{
            alert("Please enter correct details");
        }
    }


    return(
        <div className="login">
            <input className="inputBox" type="text" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input className="inputBox" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={handlelogin} className="appButton" type="button">Log In</button>
        </div>
    )
}
export default Login;