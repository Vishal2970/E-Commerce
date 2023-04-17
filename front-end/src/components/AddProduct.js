import React, { useState } from "react";

const AddProduct=()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [company,setCompany]=useState("");
    const [category,setCategory]=useState("");
    const [error,setError]=useState(false);
    const addProduct =async ()=>{
        // console.warn(name,price,company,category);
        if(!name || !price || !company || !category){       //// !name =true  / if no data in name. 
            setError(true);             
            return false;               /////// aage nhi badhega
        }
        const userId=JSON.parse(localStorage.getItem("user"))._id;
        // console.log(userId);
        let result=await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,company,category,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        })
        result=await result.json();
        // console.log(result);
        if(result){
            alert("product added");
        }
        
    }

    return(
        <div className="product"> 
            <h1>Add Product</h1>
            <input type={"text"} placeholder="Enter Product Name" className="inputBox"
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            {error && !name && <span className="invalid-input"> Enter Valid Name</span>}

            <input type={"text"} placeholder="Enter Product Price" className="inputBox"
            value={price} onChange={(e)=>setPrice(e.target.value)}
            />
            {error && !price && <span className="invalid-input"> Enter Valid Price</span>}

            <input type={"text"} placeholder="Enter Product Company" className="inputBox"
            value={company} onChange={(e)=>setCompany(e.target.value)}
            />
            {error && !company && <span className="invalid-input"> Enter Valid Company</span>}

            <input type={"text"} placeholder="Enter Product Category" className="inputBox"
            value={category} onChange={(e)=>setCategory(e.target.value)}
            />
            {error && !category && <span className="invalid-input"> Enter Valid Category</span>}

            <button className="appButton" onClick={addProduct}>Add Product</button>
            
        </div>
    )
}
export default AddProduct;