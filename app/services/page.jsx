import ServicesSection from '../../components/ServicesSection'
import DetailedProjects from '../../components/DetailedProjects'
import Navigation from '../../components/Navigation'
import React from 'react'
import Footer from '../../components/Footer'
import TrustedPartnersSlider from '../../components/TrustedPartnersSlider'
import WhyUsSection from '../../components/WhyUsSection'

function page() {
  return (
    <div>
      <Navigation/>

   <ServicesSection/>
   <TrustedPartnersSlider/>
   <WhyUsSection/>
   <Footer/>
    </div>
  )
}

export default page