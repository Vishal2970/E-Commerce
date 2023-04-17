import React, { useEffect, useState } from "react";
import { json, Params, useNavigate, useParams } from "react-router-dom";

const UpdateProduct=()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [company,setCompany]=useState("");
    const [category,setCategory]=useState("");
    const Params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails= async ()=>{
        let result=await fetch(`http://localhost:5000/product/${Params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCompany(result.company);
        setCategory(result.category);


    }
    const updateProduct =async ()=>{
        // console.warn(name,price,company,category);
        let result=await fetch(`http://localhost:5000/product/${Params.id}`,{
            method:'put',
            body:JSON.stringify({name,price,company,category}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result=await result.json();
        console.warn(result);
        navigate('/');
    }

    return(
        <div className="product"> 
            <h1>Update Product</h1>
            <input type={"text"} placeholder="Enter Product Name" className="inputBox"
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            

            <input type={"text"} placeholder="Enter Product Price" className="inputBox"
            value={price} onChange={(e)=>setPrice(e.target.value)}
            />
            

            <input type={"text"} placeholder="Enter Product Company" className="inputBox"
            value={company} onChange={(e)=>setCompany(e.target.value)}
            />
            

            <input type={"text"} placeholder="Enter Product Category" className="inputBox"
            value={category} onChange={(e)=>setCategory(e.target.value)}
            />
            

            <button className="appButton" onClick={updateProduct}>Update Product</button>
        </div>
    )
}
export default UpdateProduct;