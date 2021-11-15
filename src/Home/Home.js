import React from 'react'
import Banner from '../Banner/Banner'
import Cycles from '../Cycles/Cycles'
import Navigation from '../Navigation/Navigation'
import Riviews from '../Riviews/Riviews'
// import AboutUs from '../AboutUs/AboutUs'

// import Rides from '../Rides/Rides'
import './Home.css'

function Home() {
    return (
        <div>

            <Navigation></Navigation>
            <Banner></Banner>
            <Cycles></Cycles>
            <Riviews></Riviews>
        </div>
    )
}

export default Home
