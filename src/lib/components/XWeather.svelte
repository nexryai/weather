<script lang="ts">
    import { fly } from "svelte/transition";

    import WeatherBackground from "$lib/components/WeatherBackground.svelte";
    import type { WeatherData } from "$lib/types";

    import WeatherIcon from "./WeatherIcon.svelte";
    import XSettings from "./XSettings.svelte";

    let settingsOpen = $state(false);

    interface Props {
        weather: WeatherData;
        useLightText: boolean;
    }

    const { weather, useLightText }: Props = $props();

    const todayKey = Object.keys(weather.daily)[0];
    const currentHour = new Date(weather.current.time).getHours();
    const sunriseDate = new Date(weather.daily[todayKey].sunrise);
    const sunsetDate = new Date(weather.daily[todayKey].sunset);

    const formatDate = (date: string): string => {
        const d = new Date(date);
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    };

    const formatTime = (time: string): string => {
        const d = new Date(time);
        return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    };

    // ToDo: 将来的にはAPI側で全ての項目にisDayプロパティーを付与する
    const getTimeInDayMs = (date: Date): number => {
        return date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000;
    };

    const sunriseMs = getTimeInDayMs(sunriseDate);
    const sunsetMs = getTimeInDayMs(sunsetDate);

    const isDay = (currentTime: string): boolean => {
        const now = getTimeInDayMs(new Date(currentTime));
        return now >= sunriseMs && now <= sunsetMs;
    };
</script>

<div class="w-full md:px-16 lg:p-6 p-3">
    <div class="absolute top-4 left-4 flex flex-col items-end">
        <button class="flex items-center p-1 hover:bg-gray-300/30 cursor-pointer rounded" aria-label="open settings" onclick={() => settingsOpen = !settingsOpen} class:selected-bg={settingsOpen}>
            <svg xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="mr-1 icon icon-tabler icons-tabler-outline icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>
            <span class="text-sm font-semibold max-w-64 overflow-hidden text-nowrap text-ellipsis">{weather.latitude}, {weather.longitude}</span>
            <div class="ml-2">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
            </div>
        </button>
    </div>
    {#if settingsOpen}
        <div class="absolute top-14 left-4 w-full sm:w-128 h-128" transition:fly={{ duration: 300, x: 0, y: -300 }} >
            <XSettings useLightText={useLightText}/>
        </div>
    {/if}

    <div class="rounded-2xl overflow-hidden">
        <WeatherBackground code={weather.current.weather_code ?? undefined} isDay={weather.current.is_day === 1} useLightText={useLightText} >
            <div class="p-16 mt-16 mb-14 flex justify-between items-center max-w-[380px]">
                <div class="flex items-center text-white">
                    <WeatherIcon size={128} code={weather.current.weather_code} isDay={weather.current.is_day === 1} />
                    <span class="text-4xl font-bold ml-4">{weather.current.temperature_2m} {weather.current_units.temperature_2m}</span>
                </div>
            </div>
        </WeatherBackground>
    </div>


    <div class="flex flex-col lg:flex-row lg:justify-between text-black">
        <div class="lg:w-3/5">
            <div class="mt-12 flex flex-wrap justify-center bg-gray-50 rounded-xl mb-8">
                <div class="flex overflow-x-scroll p-2 scroll-container">
                    {#each Object.entries(weather.hourly).slice(currentHour, currentHour + 24) as [hour, data], i (hour)}
                        <div class="flex flex-col justify-center items-center mx-2">
                            <div class="w-14 h-14 flex items-center justify-center">
                                <WeatherIcon code={data.weather_code} isDay={isDay(hour)} size={48} />
                            </div>
                            <span>{formatTime(hour)}</span>
                            <span class="text-xs">{data.temperature_2m} {weather.hourly_units.temperature_2m}</span>
                            <span class="text-xs">{data.precipitation} {weather.hourly_units.precipitation}</span>
                        </div>
                        {#if i < Object.entries(weather.hourly).slice(currentHour, currentHour + 24).length - 1}
                            <span class="mt-2 mx-2 text-gray-500 text-3xl">→</span>
                        {/if}
                    {/each}
                </div>
            </div>

            <div class="mt-4 sm:mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 bg-gray-50 rounded-xl">
                <div class="flex items-center sm:flex-row flex-col">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/sunrise.svg" alt="Sunrise Icon" class="w-12 h-12" />
                    <span class="text-md font-semibold sm:ml-2">{formatTime(weather.daily[todayKey].sunrise)}</span>
                </div>
                <div class="flex items-center sm:flex-row flex-col">
                    <img src={`https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/uv-index-${weather.daily[todayKey].uv_index_max}.svg`} alt="UV index Icon" class="w-12 h-12" />
                    <span class="text-md font-semibold sm:ml-2">UV Index: {weather.daily[todayKey].uv_index_max}</span>
                </div>
                <div class="flex items-center sm:flex-row flex-col">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/sunset.svg" alt="Sunset Icon" class="w-12 h-12" />
                    <span class="text-md font-semibold sm:ml-2">{formatTime(weather.daily[todayKey].sunset)}</span>
                </div>
            </div>

            <div class="mt-16 sm:mt-32 pb-4">
                <span class="m-4 font-semibold text-md">{formatTime(weather.current.time)} 現在</span>
            </div>
            <div class="mt-2 flex flex-wrap justify-center gap-x-8 gap-y-4">
                <div class="flex items-center sm:flex-row flex-col bg-gray-50 rounded-xl p-2 sm:w-48 w-32">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/thermometer-raindrop.svg" alt="Humidity Icon" class="w-16 h-16" />
                    <span class="text-md font-semibold sm:ml-2">{weather.current.relative_humidity_2m} {weather.current_units.relative_humidity_2m}</span>
                </div>
                <div class="flex items-center sm:flex-row flex-col bg-gray-50 rounded-xl p-2 sm:w-48 w-32">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/barometer.svg" alt="Barometer Icon" class="w-16 h-16" />
                    <span class="text-md font-semibold sm:ml-2"> {weather.current.surface_pressure} {weather.current_units.surface_pressure}</span>
                </div>
                <div class="flex items-center sm:flex-row flex-col bg-gray-50 rounded-xl p-2 sm:w-48 w-32">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/windsock.svg" alt="Windsock Icon" class="w-16 h-16" />
                    <span class="text-md font-semibold sm:ml-2">{weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</span>
                </div>
                <div class="flex items-center sm:flex-row flex-col bg-gray-50 rounded-xl p-2 sm:w-48 w-32">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/wind.svg" alt="Wind Icon" class="w-16 h-16" />
                    <span class="text-md font-semibold sm:ml-2"> {weather.current.wind_gusts_10m} {weather.current_units.wind_gusts_10m}</span>
                </div>
                <div class="flex items-center sm:flex-row flex-col bg-gray-50 rounded-xl p-2 sm:w-48 w-32">
                    <img src="https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/raindrop-measure.svg" alt="Precipitation Icon" class="w-16 h-16" />
                    <span class="text-md font-semibold sm:ml-2"> {weather.current.precipitation} {weather.current_units.precipitation}</span>
                </div>
                <div class="flex items-center sm:flex-row flex-col bg-gray-50 rounded-xl p-2 sm:w-48 w-32">
                    <img src={`https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/wind-beaufort-${Math.min(weather.current.beaufort_wind_scale, 12)}.svg`} alt="Wind Icon" class="w-16 h-16" />
                    <span class="text-md font-semibold sm:ml-2">Beaufort {weather.current.beaufort_wind_scale}</span>
                </div>
            </div>
        </div>
        <div class="lg:w-2/5 lg:p-12 p-3 lg:mt-0 mt-6">
            <div class="flex flex-col justify-center p-3 px-4 lg:p-6 bg-gray-50 rounded-xl">
                {#each Object.entries(weather.daily).slice(0, 5) as [date, timeGroup]}
                    <div class="flex justify-between items-center">
                        <p>{formatDate(date)}</p>
                        <div>
                            <span class="">
                                {weather.daily[date].temperature_2m_min} {weather.current_units.temperature_2m} / {weather.daily[date].temperature_2m_max} {weather.current_units.temperature_2m}
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-center-safe mb-8 overflow-x-scroll scroll-container" class:single="{Object.entries(timeGroup).length === 1}">
                        {#each Object.entries(timeGroup.summary) as [time, summary], i (time)}
                            <div class="flex flex-col justify-center items-center mx-2">
                                <div class="w-14 h-14 flex items-center justify-center">
                                    <WeatherIcon code={summary.weather_code} isDay={true} size={48} />
                                </div>
                                {#if Object.entries(timeGroup.summary).length !== 1}
                                    <span>{formatTime(time)}</span>
                                {/if}
                            </div>
                            {#if i < Object.entries(timeGroup.summary).length - 1}
                                <span class="mt-2 mx-2 text-gray-500 text-3xl">→</span>
                            {/if}
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .selected-bg {
        /*SvelteのDynamic classに"/"が使用できないため*/
        background-color: color-mix(in oklab, var(--color-gray-300) 30%, transparent)
    }

    .scroll-container {
        scrollbar-width: thin;
        scrollbar-color: #c0c0c0 #ffffff00;
    }
</style>
