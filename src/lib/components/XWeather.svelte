<script lang="ts">
    import type { WeatherData } from "$lib/types";

    import WeatherIcon from "./WeatherIcon.svelte";

    interface Props {
        weather: WeatherData;
        useLightText: boolean;
    }

    const { weather, useLightText }: Props = $props();

    const todayKey = Object.keys(weather.daily)[0];

    console.log("Weather data:", todayKey);

    const formatDate = (date: string): string => {
        const d = new Date(date);
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    };

    const formatTime = (time: string): string => {
        const d = new Date(time);
        return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    };

</script>
<div class="w-full px-16 mt-8 p-6 flex justify-between" class:text-white={useLightText}>
    {#if weather}
        <div>
            <div class="flex items-center">
                <WeatherIcon size={128} code={weather.current.weather_code} isDay={weather.current.is_day === 1 ? true : false} />
                <span class="text-4xl font-bold ml-4">{weather.current.temperature_2m} {weather.current_units.temperature_2m}</span>
            </div>

            <div>
                <div class="flex items-center mt-4">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/sunrise.svg" alt="Sunrise Icon" class="w-16 h-16" />
                    <span class="text-2xl font-semibold ml-2">{formatTime(weather.daily[todayKey].sunrise)}</span>
                </div>
                <div class="flex items-center mt-4">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/sunset.svg" alt="Sunset Icon" class="w-16 h-16" />
                    <span class="text-2xl font-semibold ml-2">{formatTime(weather.daily[todayKey].sunset)}</span>
                </div>
                <div class="flex items-center mt-4">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/thermometer-raindrop.svg" alt="Sunset Icon" class="w-16 h-16" />
                    <span class="text-2xl font-semibold ml-2">{weather.current.relative_humidity_2m} {weather.current_units.relative_humidity_2m}</span>
                </div>
                <div class="flex items-center mt-4">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/barometer.svg" alt="Sunset Icon" class="w-16 h-16" />
                    <span class="text-2xl font-semibold ml-2"> {weather.current.surface_pressure} {weather.current_units.surface_pressure}</span>
                </div>
                <div class="flex items-center mt-4">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/windsock.svg" alt="Sunset Icon" class="w-16 h-16" />
                    <span class="text-2xl font-semibold ml-2">{weather.current.wind_direction_10m}{weather.current_units.wind_direction_10m} {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</span>
                </div>
                <div class="flex items-center mt-4">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/wind.svg" alt="Sunset Icon" class="w-16 h-16" />
                    <span class="text-2xl font-semibold ml-2"> {weather.current.wind_gusts_10m} {weather.current_units.wind_gusts_10m}</span>
                </div>
                <div class="flex items-center mt-4">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/raindrop-measure.svg" alt="Sunset Icon" class="w-16 h-16" />
                    <span class="text-2xl font-semibold ml-2"> {weather.current.precipitation} {weather.current_units.precipitation}</span>
                </div>
                <ul class="space-y-1 text-gray-800">
                    <li>
                        <span class="font-semibold">Time:</span>
                        <span>{weather.current.time}</span>
                    </li>
                </ul>
            </div>
            <div>
                <div>
                    <img src={`https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/uv-index-${Math.round(weather.daily[todayKey].uv_index_max)}.svg`} alt="Sunset Icon" class="w-16 h-16" />
                </div>
            </div>
        </div>
        <div class="p-12">
            <div class="rounded-lg p-6 w-96">
                {#each Object.entries(weather.daily) as [date, timeGroup]}
                    <div class="flex justify-between items-center">
                        <p class="font-bold">{formatDate(date)}</p>
                        <div>
                            <span class="font-semibold">
                                {Math.round(weather.daily[date].temperature_2m_max)} {weather.current_units.temperature_2m} / {Math.round(weather.daily[date].temperature_2m_min)} {weather.current_units.temperature_2m}
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-center mb-8 overflow-scroll" class:single="{Object.entries(timeGroup).length === 1}">
                        {#each Object.entries(timeGroup.summary) as [time, summary], i (time)}
                            <div class="flex flex-col justify-center items-center mx-2">
                                <div class="w-14 h-14 flex items-center justify-center">
                                    <WeatherIcon code={summary.weather_code} isDay={true} size={48} />
                                </div>
                                {#if Object.entries(timeGroup).length !== 1}
                                    <span class="font-semibold">{formatTime(time)}</span>
                                {/if}
                            </div>
                            {#if i < Object.entries(timeGroup).length - 1}
                                <span class="mt-2 mx-2 text-gray-500 text-3xl">→</span>
                            {/if}
                        {/each}
                    </div>
                {/each}
            </div>
        </div>

    {:else}
        <p class="text-gray-500">No weather data available.</p>
    {/if}
</div>
