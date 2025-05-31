<script lang="ts">
    import type { WeatherData } from "$lib/types";

    import WeatherIcon from "./WeatherIcon.svelte";

    interface Props {
        weather: WeatherData;
    }

    const { weather }: Props = $props();
</script>

<div class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    {#if weather}
        <h2 class="text-2xl font-bold mb-4 text-blue-700">Weather Data</h2>
        <ul class="mb-6 space-y-1 text-gray-700">
            <li>
                <span class="font-semibold">Location:</span>
                <span>{weather.latitude}, {weather.longitude}</span>
            </li>
            <li>
                <span class="font-semibold">Timezone:</span>
                <span>{weather.timezone} ({weather.timezone_abbreviation})</span>
            </li>
            <li>
                <span class="font-semibold">Elevation:</span>
                <span>{weather.elevation} m</span>
            </li>
        </ul>
        <h3 class="text-xl font-semibold mb-2 text-blue-600">Current Weather</h3>
        <ul class="space-y-1 text-gray-800">
            <li>
                <span class="font-semibold">Time:</span>
                <span>{weather.current.time}</span>
            </li>
            <li>
                <span class="font-semibold">Temperature:</span>
                <span>{weather.current.temperature_2m} {weather.current_units.temperature_2m}</span>
            </li>
            <li>
                <WeatherIcon code={weather.current.weather_code} isDay={weather.current.is_day === 0 ? true : false} />
            </li>
            <li>
                <span class="font-semibold">Humidity:</span>
                <span>{weather.current.relative_humidity_2m} {weather.current_units.relative_humidity_2m}</span>
            </li>
            <li>
                <span class="font-semibold">Wind Speed:</span>
                <span>{weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</span>
            </li>
            <li>
                <span class="font-semibold">Pressure:</span>
                <span>{weather.current.pressure_msl} {weather.current_units.pressure_msl}</span>
            </li>
            <li>
                <span class="font-semibold">Rain:</span>
                <span>{weather.current.rain} {weather.current_units.rain}</span>
            </li>
        </ul>
    {:else}
        <p class="text-gray-500">No weather data available.</p>
    {/if}
</div>
