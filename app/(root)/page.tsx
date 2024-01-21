'use client'

import Image from "next/image"
import { useState, useEffect } from "react";
import { Forecast } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchForecast } from "@/lib/actions/forecast.action";
import Error from "./error";
import Condition from "@/components/Condition";
import ConditionGroup from "@/components/ConditionGroup";

function convertTime(time: Date) {
  const event = new Date(time);
  const date = event.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return date
}

const Page = () => {
  const [supports, setSupports] = useState(true);
  const [latitude, setLatitude] = useState<number>();
  const [longtitude, setLongtitude] = useState<number>();

  const { isPending, error, data } = useQuery<Forecast>({
    queryKey: ['forecast'],
    queryFn: function () {
      return fetchForecast(latitude + ',' + longtitude)
    },
    enabled: !!latitude && !!longtitude,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongtitude(position.coords.longitude);
    });
  }, [])

  if (isPending) return <p className="text-normal">Loading...</p>

  if (error) {
    return <Error error={String(error.message)} />
  }

  const event = new Date(data.current.last_updated);
  const date = convertTime(event)

  return (
    <div className="flex lg:gap-8 max-xl:flex-col max-lg:gap-8">
      <div className="flex flex-col justify-between items-center grow gap-8">
        <div className="w-full">
          <div className="w-full flex flex-col items-start text-left">
            <h1 className="h1-bold">{data.location.name}, {data.location.country}</h1>
            <p className="text-normal">{date}</p>
          </div>
          <div className="w-full flex justify-center">
            <Image src={`https:${data.current.condition.icon}`} alt="Weather Image" width={175} height={175} />
          </div>
          <div className="w-full flex flex-col items-end text-left">
            <h1 className="h1-bold">{data.current.condition.text}</h1>
            <p className="text-bigger">{data.current.temp_c}&deg;C</p>
          </div>
          <section className="w-full flex flex-col mt-2">
            <h2 className="text-bigger font-medium">Alerts:</h2>
            {data.alerts.alert.length > 0 ?
              data.alerts.alert.map(alert => (
                <div className="flex gap-1 items-center" key={alert.expires}>
                  <Image src={'Tick.svg'} alt="Alert article" width={30} height={30} />
                  <p className="text-normal">{alert.event}</p>
                </div>
              ))
              : (
                <div className="flex gap-1 items-center">
                  <Image src={'Tick.svg'} alt="Alert article" width={30} height={30} />
                  <p className="text-normal">No alerts found...</p>
                </div>
              )}
          </section>
        </div>
        <section className="w-full h-fit glassmorphism p-6 py-4 m">
          <h2 className="h2-medium">This Week</h2>
          <div className="flex items-center justify-around max-md:flex-wrap gap-5">
            {data.forecast.forecastday.map(day => (
              <div key={day.date} className="flex flex-col justify-center items-center gap-1 py-6">
                <p className="text-medium">{convertTime(new Date(day.date)).split(' ')[0]}</p>
                <Image src={`https:${day.day.condition.icon}`} alt="Weather Image" width={64} height={64} />
                <p className="text-normal">{day.day.mintemp_c}&deg;C / {day.day.maxtemp_c}&deg;C</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <aside className="w-fit glassmorphism p-6 py-4 max-xl:w-full pb-8">
        <h2 className="h2-medium">Air Conditions</h2>
        <div className="flex flex-col items-end gap-10">
          <ConditionGroup
            conditions={[
              { title: "Wind Degree", value: `${data.current.wind_degree}` },
              { title: "Wind Direction", value: `${data.current.wind_dir}` },
              { title: "Wind Speed (kph)", value: `${data.current.wind_kph} kph` },
              { title: "Wind Speed (mph)", value: `${data.current.wind_mph} mph` }
            ]} />
          <ConditionGroup
            conditions={[
              { title: "Gust (kph)", value: `${data.current.gust_kph} kph` },
              { title: "Gust (mph)", value: `${data.current.gust_mph} mph` },
            ]} />
        </div>
      </aside>
    </div>
  )
}

export default Page