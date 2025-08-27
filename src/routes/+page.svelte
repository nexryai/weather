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

<div
    class="min-h-screen bg-gray-100"
    style="touch-action: pan-y;"
>
    {#if error}
        <div class="flex flex-col items-center justify-center h-screen w-full text-center">
            <p>Unrecoverable Error. Please reload.</p>
            <p class="mt-4">Technical Details: <span class="font-mono">{error}</span></p>
        </div>
    {:else if weatherData}
        <div>
            <XWeather weather={weatherData} useLightText />
            <div class="w-full md:px-16 mt-8 lg:p-6 p-3 text-sm text-center text-gray-400">
                <p>©2025 nexryai All rights reserved.</p>
                <p>Weather data: OpenMeteo, Geometry data: OpenStreetMap (openstreetmap.org)</p>
            </div>
        </div>
    {/if}
</div>
