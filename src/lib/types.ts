interface CurrentUnits {
    time: string;
    interval: string;
    temperature_2m: string;
    weather_code: string;
    rain: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
    pressure_msl: string;
    surface_pressure: string;
    precipitation: string;
    is_day: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    cloud_cover: string;
    snowfall: string;
    showers: string;
}

interface CurrentWeather {
    time: string; // ISO8601 datetime string
    interval: number;
    temperature_2m: number;
    weather_code: number; // WMO code
    rain: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    pressure_msl: number;
    surface_pressure: number;
    precipitation: number;
    is_day: number; // 0 for night, 1 for day
    apparent_temperature: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    snowfall: number;
    showers: number;
}

interface HourlyUnits {
    time: string;
    temperature_2m: string;
    weather_code: string;
    rain: string;
    precipitation_probability: string;
    precipitation: string;
    showers: string;
    snowfall: string;
}

interface HourlyDataPoint {
    temperature_2m: number;
    weather_code: number; // WMO code
    rain: number;
    precipitation_probability: number;
    precipitation: number;
    showers: number;
    snowfall: number;
}

interface DailyUnits {
    time: string;
    weather_code: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    uv_index_clear_sky_max: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    daylight_duration: string;
    sunshine_duration: string;
}

interface DailyDataPoint {
    weather_code: number; // WMO code
    sunrise: string; // ISO8601 datetime string
    sunset: string; // ISO8601 datetime string
    uv_index_max: number;
    uv_index_clear_sky_max: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
    daylight_duration: number;
    sunshine_duration: number;
}

interface DailySummaryDataPoint {
    weather_code: number; // WMO code
    temperature_2m_max: number;
    temperature_2m_min: number;
    precipitation_probability: number;
    precipitation: number;
    showers: number;
    snowfall: number;
    arrow_length: number;
}

// Type for the inner object of daily_summary, where keys are time strings (e.g., "00:00", "09:00")
type DailySummaryTimeGroup = Record<string, DailySummaryDataPoint>;

// Type for the hourly data, where keys are ISO8601 datetime strings
type HourlyData = Record<string, HourlyDataPoint>;

// Type for the daily data, where keys are ISO8601 date strings
type DailyData = Record<string, DailyDataPoint>;

// Type for the daily_summary, where keys are ISO8601 date strings
type DailySummary = Record<string, DailySummaryTimeGroup>;

export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnits;
    current: CurrentWeather;
    hourly_units: HourlyUnits;
    hourly: HourlyData;
    daily_units: DailyUnits;
    daily: DailyData;
    daily_summary: DailySummary;
}