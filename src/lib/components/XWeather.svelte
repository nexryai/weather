<script lang="ts">
    import type { WeatherData } from "$lib/types";

    import WeatherIcon from "./WeatherIcon.svelte";

    interface Props {
        weather: WeatherData;
        useLightText: boolean;
    }

    const { weather, useLightText = $bindable<boolean>() }: Props = $props();

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
                <span class="text-4xl font-bold">{weather.current.temperature_2m} {weather.current_units.temperature_2m}</span>
            </div>
            <div>
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
                <ul class="space-y-1 text-gray-800">
                    <li>
                        <span class="font-semibold">Time:</span>
                        <span>{weather.current.time}</span>
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
            </div>
        </div>
        <div class="p-12">
            <div class="bg-[#f0f0f04d] backdrop-blur-2xl rounded-lg p-6 shadow-md w-96">
                {#each Object.entries(weather.daily_summary) as [date, timeGroup]}
                    <div class="flex justify-between items-center">
                        <p class="font-bold">{formatDate(date)}</p>
                        <div>
                            <span class="font-semibold">
                                {Math.round(weather.daily[date].temperature_2m_max)} {weather.current_units.temperature_2m} / {Math.round(weather.daily[date].temperature_2m_min)} {weather.current_units.temperature_2m}
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-center mb-8" class:single="{Object.entries(timeGroup).length === 1}">
                        {#each Object.entries(timeGroup) as [time, summary], i (time)}
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
