import React from 'react'
import MyOrders from '../MyOrders/MyOrders'
import Pay from '../Pay/Pay'
import WriteReview from '../WriteReview/WriteReview'

function Dashboard() {
    return (
        <div>
            <Pay></Pay>
            <MyOrders></MyOrders>
            <WriteReview></WriteReview>


        </div>
    )
}

export default Dashboard
