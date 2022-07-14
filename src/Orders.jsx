import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import Order from "./Order";
import { useStateValue } from "./StateProvider";
// import Order from "./Order";
import { doc, query, orderBy, collection, getDocs } from "firebase/firestore";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  console.log(orders);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const userRef = collection(db, `users/${user?.uid}/orders`);
        const q = query(userRef, orderBy("created", "desc"));
        const querySnapshot = await getDocs(q);
        const updatedOrders = [];
        querySnapshot.forEach((doc) => {
          updatedOrders.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOrders(updatedOrders);
      };
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
