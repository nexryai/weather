<script lang="ts">
    import { setContext } from "svelte";

    import XWeather from "$lib/components/XWeather.svelte";

    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    const weatherData = data.weather;
    const error = data.error;

    let iconTheme = $state("fluent");

    setContext("iconTheme", () => iconTheme);
</script>

<svelte:head>
    <title>{data.cityName ? `Weather in ${data.cityName}` : "Weather App"}</title>
    <meta name="description" content="A simple weather app built with SvelteKit and OpenMeteo API." />
</svelte:head>

<div
    class="min-h-screen bg-gray-100"
    style="touch-action: pan-y;"
>
    {#if error}
        <div class="flex flex-col items-center justify-center h-screen w-full text-center">
            <div class="mb-4 text-red-600">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
            </div>
            <p>Unrecoverable Error. Please reload or try again later.</p>
            <p class="mt-4">Technical Details: <span class="font-mono">{error}</span></p>
        </div>
    {:else if weatherData}
        <div>
            <XWeather weather={weatherData} cityName={data.cityName} useLightText />
            <div class="w-full md:px-16 mt-8 lg:p-6 p-3 text-sm text-center text-gray-400">
                <p>©2025 nexryai All rights reserved.</p>
                <p>Weather data: OpenMeteo, Geometry data: OpenStreetMap (openstreetmap.org)</p>
            </div>
        </div>
    {/if}
</div>
