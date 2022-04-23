import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import {addDoc, collection} from 'firebase/firestore';
import fireDB from "../fireConfig";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import Loader from "../components/Loader";




function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    let temp = 0;
    cartItems.forEach(() => {
      temp = temp + cartItems.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

    const placeOrder = async() =>{
      const addressInfo ={
        name,
        address,
        pincode,
        phoneNumber,
      }
      console.log(addressInfo)
      const orderInfo = {
        cartItems,
        addressInfo,
        email: JSON.parse(localStorage.getItem("currentUser")).user.email,
        userId: JSON.parse(localStorage.getItem("currentUser")).user.uid,
      }
      try {
        setLoading(true)
        const result = await addDoc(collection(fireDB, "orders"), orderInfo)
        setLoading(false)
        toast.success("Order Placed Successfully")
        handleClose()
      } catch (error) {
        toast.error("Order Failed")
        setLoading(false)


        
      }
    };
  return (
    <Layout loading ={loading}>
      <div className="container">
        <table className="table mt-3">
          <thead>
            <tr>
              <th> Image </th>
              <th> Name </th>
              <th> Price </th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <tr>
                  <td>
                    {" "}
                    <img src={item.imageURL} height="80" width="80" />{" "}
                  </td>
                  <td>{item.name} </td>
                  <td>{item.price} </td>
                  <td>
                    <FaTrash onClick={() => deleteFromCart(item)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <h1 className="total-amount"> Total Amount = GHC: {totalAmount} </h1>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button onClick ={handleShow}> PLACE ORDER</button>
        </div>
      </div>

        <Modal  show ={show} onHide= {handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Place your ordeer here</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
          <div className="register-form">
            <h2> Register</h2>
            <hr />
            <input type="text" className ="form-control" placeholder ="Name" value ={name} onChange = {(e) =>setName(e.target.value)} />
            <textarea type="text" className ="form-control" placeholder ="Address" value ={address} onChange = {(e) =>setAddress(e.target.value)} />
            <input type="number" className ="form-control" placeholder ="Pincode"  value ={pincode} onChange = {(e) =>setPincode(e.target.value)} />
            <input type="number" className ="form-control" placeholder ="PhoneNumber"  value ={phoneNumber} onChange = {(e) =>setPhoneNumber(e.target.value)} />

              <hr />

          </div>

          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>CLOSE</button>
            <button onClick={placeOrder}>ORDER</button>

          </Modal.Footer>

        </Modal>
    </Layout>
  );
}

export default CartPage;
