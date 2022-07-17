import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Local imports
import Order from './Order'
import { getUserOrdersAction } from './redux/userSlice/userActions'
import './Orders.css'

function Orders () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const orders = useSelector(state => state.user.orders)

  useEffect(() => {
    dispatch(getUserOrdersAction(user))
    // eslint-disable-next-line
  }, [])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      {user ? (
        <>
          <div className='orders__order'>
            {!orders ? (
              <div className='orders__empty'>
                <span>
                  You have any prior orders, once you make a purchase, all
                  previous orders will show up here.
                </span>
                <Link to='/'>Click here to continue shopping</Link>
              </div>
            ) : (
              orders?.map(order => <Order order={order} />)
            )}
          </div>
        </>
      ) : (
        <div className='orders__empty'>
          <span>Must be logged in to view orders</span>
          <Link to='/login'>Click here to Login/Signup</Link>
        </div>
      )}
    </div>
  )
}

export default Orders
