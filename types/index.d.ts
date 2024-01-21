export type Forecast = {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime: string
  },
  current: {
    last_updated: string,
    temp_c: number,
    temp_f: number,
    is_day: number,
    condition: {
      text: string,
      icon: string,
      code: number
    },
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    uv: number,
    gust_mph: number,
    gust_kph: number
  },
  forecast: {
    forecastday: {
      date: string,
      day: {
        maxtemp_c: number,
        maxtemp_f: number,
        mintemp_c: number,
        mintemp_f: number,
        condition: {
          text: string,
          icon: string,
          code: number
        },
      },
      hour: {
        condition: {
          text: string,
          icon: string,
          code: number
        },
      }
    }[]
  }
  alerts: {
    alert: {
      severity: string,
      expires: string,
      certainty: string,
      event: string,
    }[]
  }
}

export type ForecastError = {
  error: {
    code: number,
    message: string
  }
}