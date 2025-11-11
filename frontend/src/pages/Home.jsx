import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  let heroData = [
    {text1: "", text2: ""},
    {text1: "", text2: ""},
    {text1: "", text2: ""},
    {text1: "", text2: ""}
  ]

  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    },3000);
    return () => clearInterval(interval)
  },[])
  
  return (
    <div className='overflow-x-hidden relative top-[70px] bg-[#fafafa]'>
    <div className=' w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-br from-[#ffffff] via-[#f8f8f8] to-[#f0f0f0]'>
      <Backgound heroCount={heroCount}/>
    </div>
    <Product/>
    <OurPolicy/>
    <NewLetterBox/>
    <Footer/>
    </div>
  )
}

export default Home