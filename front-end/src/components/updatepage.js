import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const UpdatePage=()=>{
    const [productID,setProductId]=useState("");
    const navigate=useNavigate();
    const getProductDetails= async (id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        if(result.name){
            return true;
        }
        return false;
    }
    const update=(id)=>{
        console.log(getProductDetails(id))
        if(!id || getProductDetails(id)==false){
            alert("Enter enter correct product ID");
            return;
        }
        navigate(`/update/${id}`);
        
    }
    return(
        <div className="product">
            <h1>Update Product</h1>
            <input type={"text"} placeholder="Enter Product Id" className="inputBox"
            value={productID} onChange={(e)=>setProductId(e.target.value)}
            />
            <button className="appButton" onClick={()=>update(productID)}>UPDATE</button>
            <Link to={"/"} className='link-color'><u>Select From Product List</u></Link>

        </div>
    )
}
export default UpdatePage;