<script lang="ts">
    import { onMount } from "svelte";

    import type { WeatherData } from "$lib/types";
    import XWeather from "$lib/components/XWeather.svelte";

    let isLoading = $state(true);
    let weatherData: WeatherData | null = $state(null);
    let error: string | null = $state(null);

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
            error = "Error parsing data";
        } finally {
            isLoading = false;
        }
    });
</script>

<div>
    {#if isLoading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else if weatherData}
        <XWeather weather={weatherData} />
    {/if}
</div>
