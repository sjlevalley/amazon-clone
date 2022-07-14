import React, { useState, useEffect } from "react";
import { query, orderBy, collection, getDocs } from "firebase/firestore";
// Local imports
import Order from "./Order";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Orders.css";

function Orders() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

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
      try {
        fetchOrders();
      } catch (e) {
        console.error(e);
      }
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
