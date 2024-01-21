'use server'

import { Forecast, ForecastError } from "@/types";

export async function fetchForecast(queryParam: string) {
    try {      
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${queryParam}&days=6&aqi=no&alerts=yes`, {
            cache: 'no-cache',
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error(await res.json().then((res: ForecastError) => res.error.message));
        }

        const data: Forecast = await res.json();

        return data;
    } catch (error: any) {
        console.error(error);
        throw new Error('The server was not able to retrieve data.');
    }
}