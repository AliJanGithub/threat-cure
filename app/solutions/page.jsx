import TrustedPartnersSlider from '../../components/TrustedPartnersSlider'
import Navigation from '../../components/Navigation'
import React from 'react'
import ServicesSection from '../../components/ServicesSection'
import WhyUsSection from '../../components/WhyUsSection'
import Footer from '../../components/Footer'

export default function page() {
  return (
    <>
   
    <Navigation/>
     <TrustedPartnersSlider/>
      <ServicesSection />
        <WhyUsSection />
        <Footer/>
      </>
  )
}
