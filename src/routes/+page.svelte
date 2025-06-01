<script lang="ts">
    import { onMount, setContext } from "svelte";

    import WeatherBackground from "$lib/components/WeatherBackground.svelte";
    import XWeather from "$lib/components/XWeather.svelte";
    import type { WeatherData } from "$lib/types";

    let isLoading = $state(true);
    let weatherData: WeatherData | null = $state(null);
    let error: string | null = $state(null);
    let iconTheme = $state("meteocons");
    let backgroundTheme = $state("gradient");

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
            error = "Error parsing data";
        } finally {
            isLoading = false;
        }
    });
</script>

<div>
    <WeatherBackground code={weatherData?.current.weather_code || 0} isDay={weatherData?.current.is_day === 1 ? true : false} />
    {#if isLoading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else if weatherData}
        <XWeather weather={weatherData} />
    {/if}
</div>
