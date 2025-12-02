import TrustedPartnersSlider from '../../components/TrustedPartnersSlider'
import Navigation from '../../components/Navigation'
import React from 'react'
import ServicesSection from '../../components/ServicesSection'
import WhyUsSection from '../../components/WhyUsSection'
import Footer from '../../components/Footer'
import Projects from '../../components/Projects'
import DetailedProjects from '../../components/DetailedProjects'

export default function page() {
  return (
    <>
   
    <Navigation/>
     <TrustedPartnersSlider/>
     <DetailedProjects/>
     {/* <Projects/> */}
      {/* <ServicesSection />
        <WhyUsSection /> */}
        <Footer/>
      </>
  )
}
