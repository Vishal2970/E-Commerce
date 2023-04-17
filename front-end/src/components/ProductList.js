import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });         ////// in get no need of body, header,etc.
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct=async(id)=>{
        // console.warn(id);
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        if(result){
            getProduct();
        }
    }

    const searchHandle=async (event)=>{
        let key=event.target.value;
        // key=key.toLowerCase();         /// if capital or small find with anyone
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            result=await result.json();
            if(result)
                setProducts(result);
        }
        else{
            getProduct();
        }
            
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input className="search-product-box" type="text" placeholder="Search Product" 
            onChange={searchHandle}
            />
            <ul >
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {products.length>0?(
                products.map((item,index) =>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={()=>deleteProduct(item._id)}>DELETE</button>
                            <Link to={"/update/"+item._id} className='link-color'><u>UPDATE</u></Link>
                        </li>
                    </ul>
                )
            ):(<h1>No products found</h1>)
            }


        </div>
    )
}
export default ProductList;