<script lang="ts">
    import { onMount, setContext } from "svelte";

    import WeatherBackground from "$lib/components/WeatherBackground.svelte";
    import XSettings from "$lib/components/XSettings.svelte";
    import XWeather from "$lib/components/XWeather.svelte";
    import type { WeatherData } from "$lib/types";

    let isLoading = $state(true);
    let weatherData: WeatherData | null = $state(null);
    let error: string | null = $state(null);
    let useLightText = $state(false);
    let settingsOpen = $state(false);
    let iconTheme = $state("fluent");
    let backgroundTheme = $state("unsplash1");

    setContext("iconTheme", () => iconTheme);
    setContext("bgTheme", () => backgroundTheme);

    onMount(async () => {
        const resp = await fetch("https://skyflame.nexryai.workers.dev/v1/overview?withDailySummary=true");
        if (!resp.ok) {
            error = "Failed to load data";
            isLoading = false;
            return;
        }

        try {
            const data = await resp.json();
            weatherData = data as WeatherData;
        } catch (err) {
            console.error("Error parsing weather data:", err);
            error = err instanceof Error ? err.message : "Unknown error";
        } finally {
            isLoading = false;
        }
    });
</script>

<div>
    <button
        class="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
        onclick={() => settingsOpen = !settingsOpen}
        aria-label="Open Settings"
    ></button>
    <WeatherBackground code={weatherData?.current.weather_code ?? undefined} isDay={weatherData?.current.is_day === 1 ? true : false} bind:useLightText />
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
        <XWeather weather={weatherData} useLightText />
    {/if}

    <XSettings open={settingsOpen} useLightText />
</div>
