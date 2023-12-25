"use client";
import { useState } from 'react'
import Weather from './weather';


const apikey = "bb843fec55752897cd135b1943a805ba";


export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('')

  async function getData() {
    if(city.trim()==''){
      setErr('Empty Query!!')
      setShow(false)
      return
    }
    var geocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${city},In&limit=5&appid=${apikey}`
    const geoData = await fetch(geocoding).then((res)=>{
      res.json().then(async (gd)=>{
        var cityData = gd[0]
        if(cityData===undefined) throw new Error("wrongspellingerr");
        else {
          setErr('')
          const lat = cityData['lat']
          const lon = cityData['lon']
          
          var weatherapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`

          const wdata = await fetch(weatherapi).then((res)=>{
            res.json().then((wh)=>{
              // console.log(wh);
              setWeather(wh);
              
              setShow(true)
              
            })
          })
        }
      }).catch((err)=>{
        setErr('Possible Wrong Spelling')
        setShow(false)
      })
      
    }).catch((err)=>{
      console.log(err);
      
    })
  } 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  ">
      <div className='search flex flex-col gap-2 md:gap-0 md:flex-row justify-center  items-center bg-blue-500 bg-opacity-30 w-3/4   py-5' >
          <div className='w-2/4 md:w-auto'>
            <input id='city' onChange={()=>setCity((document.getElementById('city') as HTMLInputElement ).value)} placeholder='City' className='w-full text-center md:text-left rounded-full  dark:text-white dark:bg-slate-600 text-black px-9 py-2 outline-none'/>
          </div>
          <div className='w-2/4 md:w-auto'>
            <button  onClick={getData} className='p-2 block w-full md:w-auto relative md:-mx-8 px-5 rounded-full  bg-slate-400 '>Search</button>

          </div>

      </div>
      {err!='' && 
          <div className=''>
            <p className='  dark:text-white'>{err}</p>
          </div>}
      {show && <Weather props={weather}/>}
    </main>
  )
}
