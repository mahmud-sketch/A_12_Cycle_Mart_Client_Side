import React from 'react'
import AboutUS from '../AboutUS/AboutUS'
import Banner from '../Banner/Banner'
// import Cycles from '../Cycles/Cycles'
import HomeCycle from '../HomeCycle/HomeCycle'
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
            <HomeCycle></HomeCycle>
            <Riviews></Riviews>
            <AboutUS></AboutUS>
        </div>
    )
}

export default Home
