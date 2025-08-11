<script lang="ts">
    import { onMount, setContext } from "svelte";

    import XWeather from "$lib/components/XWeather.svelte";
    import type { WeatherData } from "$lib/types";

    let isLoading = $state(true);
    let weatherData: WeatherData | null = $state(null);
    let error: string | null = $state(null);
    let iconTheme = $state("fluent");

    setContext("iconTheme", () => iconTheme);

    const fetchWeather = async() => {
        error = null;
        try {
            const resp = await fetch("https://skyflame.nexryai.workers.dev/v1/overview?withDailySummary=true");
            if (!resp.ok) {
                error = "Failed to load data";
                isLoading = false;
                return;
            }
            const data = await resp.json();
            weatherData = data as WeatherData;
        } catch (err) {
            console.error("Error parsing weather data:", err);
            error = err instanceof Error ? err.message : "Unknown error";
        } finally {
            isLoading = false;
        }
    };

    onMount(async () => {
        isLoading = true;
        await fetchWeather();
        isLoading = false;

    });
</script>

<div
    class="min-h-screen bg-gray-100"
    style="touch-action: pan-y;"
>
    {#if isLoading}
        <div class="flex items-center justify-center h-screen w-full text-center">
            <p>Loading...</p>
        </div>
    {:else if error}
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
