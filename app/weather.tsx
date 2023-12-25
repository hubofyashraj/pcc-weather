import React, { FC } from "react"
interface Props {
    props: any;
}
const Weather: FC<Props> = ({ props }) => {
    var sunrise = new Date(props.sys['sunrise']*1000)
    var sunset = new Date(props.sys['sunset']*1000)
    
    return (
        <div className="flex flex-col  w-3/4 h-3/4 bg-blue-500 bg-opacity-15">
            <div className="flex flex-row flex-wrap justify-between">
                <div className="my-5">
                    <div className="px-5 "><label className=" text-4xl md:text-7xl">{props.name}</label></div>
                    <div className="px-6 "><label className=" text-wrap">{Date().split(/\d\d:\d\d/)[0]}</label></div>
                </div>
                <div className="flex justify-center md:justify-normal md:flex-col  ">
                    <div className="hidden md:flex justify-end">
                        <img className=" " src={`https://openweathermap.org/img/wn/${props.weather[0]['icon']}@2x.png`} />
                    </div>
                    <div className="flex flex-col md:flex-row justify-center md:justify-end flex-wrap gap-5 mx-5 relative md:-my-2 ">
                        <div><label>Sunrise    <span>{'  '} {sunrise.getHours()+':'+sunrise.getMinutes()}</span></label></div>
                        <div><label>Sunset    <span>{'  '}{sunset.getHours()+':'+sunset.getMinutes()}</span></label></div>
                    </div>
                </div>

            </div>
            <div className="wheather my-5 flex justify-center items-center">
                <div className="flex flex-col ">
                    <div className="text-center"><label className="text-4xl ">{props.weather[0]['main']}</label></div>
                    <div className=""><img className=" mx-auto size-40 " src={`https://openweathermap.org/img/wn/${props.weather[0]['icon']}@2x.png`} /></div>
                    <div className="text-center"><label className="text-xl">{props.weather[0]['description']}</label></div>
                    <div className="text-center"><label className="text-xl">Temperature  <span className="text-2xl">{(props.main['temp']-276).toPrecision(3)} &deg;<span className="text-base">c</span></span></label></div>
                </div>
            </div>

        </div>
    )
}

export default Weather;