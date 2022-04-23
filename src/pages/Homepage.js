import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { electroniceproducts } from "../electronicecommenrce-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Homepage() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector(state => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSeacrchKey] = useState('');
  const [filterType, setFilterType] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => { 
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true)
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
         setLoading(false)
      });

      setProducts(productsArray); 
    } catch (error) {
      console.log(error);
       setLoading(false)
    }
  }

  useEffect(()=>{
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
  }, [cartItems])

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
 
  return (
    <Layout loading ={loading} >
      <div className="container">
        <div className="d-flex w-50">
          <input type="text" className= "form-control mx-2" placeholder ="search items" value={searchKey} onChange={(e)=>{setSeacrchKey(e.target.value)}} />
          <select name=""  className= "form-control mt-3" value={filterType} onChange={(e)=>{setFilterType(e.target.value)}}>
            <option value=''> All </option>
            <option value="electronice"> Electronice  </option>
            <option value="mobile"> Mobiles </option>
            <option value="fashion"> Fashion</option>
               
           
          </select>
        </div>
        <div className="row">
          {products
          .filter((obj)=>obj.name.toLowerCase().includes(searchKey))
          .filter((obj)=>obj.categories.toLowerCase().includes(filterType))
          .map((product) => {
            return (
              <div className="col-md-3">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p>{product.name} </p>
                    <div className="text-center">
                      <img
                        src={product.imageURL}
                        alt=""
                        className="product-img"
                      />
                    </div>
                  </div>

                  <div className="product-action">
                    <h2>Ghc:{product.price} </h2>
                    <div className="d-flex">
                      <button
                        className="mx-2"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/productinfo/${product.id}`);
                        }}
                      >
                        VIEW{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
