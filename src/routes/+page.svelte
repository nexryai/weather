<script lang="ts">
    import { onMount, setContext } from "svelte";

    import XWeather from "$lib/components/XWeather.svelte";
    import type { WeatherData } from "$lib/types";

    let isLoading = $state(true);
    let weatherData: WeatherData | null = $state(null);
    let error: string | null = $state(null);
    let iconTheme = $state("fluent");

    setContext("iconTheme", () => iconTheme);

    // --- Pull to refresh state ---
    let touchStartY = 0;
    let touchCurrentY = 0;
    let pulling = $state(false);
    let pullDistance = $state(0);
    let refreshing = $state(false);
    const PULL_THRESHOLD = 240;

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

    const handleTouchStart = (e: TouchEvent) => {
        if (window.scrollY === 0) {
            pulling = true;
            touchStartY = e.touches[0].clientY;
            pullDistance = 0;
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!pulling) return;
        touchCurrentY = e.touches[0].clientY;
        pullDistance = Math.max(0, touchCurrentY - touchStartY);
        console.log("Pull distance:", pullDistance);
        // スクロール最上部でのみpreventDefault
        if (pullDistance > 0 && window.scrollY === 0) {
            e.preventDefault();
        }
    };

    const handleTouchEnd = async() => {
        if (pulling && pullDistance > PULL_THRESHOLD) {
            refreshing = true;
            // 一瞬でロードが終わると不自然なので最低0.5秒待つ
            await Promise.all([
                new Promise(resolve => setTimeout(resolve, 500)),
                fetchWeather()
            ]);
            refreshing = false;
        }
        // pulldistanceを徐々に減らしてく
        const interval = setInterval(() => {
            if (pullDistance <= 0) {
                pulling = false;
                clearInterval(interval);
            } else {
                pullDistance -= 25;
            }
        }, 10);
    };

    onMount(async () => {
        isLoading = true;
        await fetchWeather();
        isLoading = false;

    });
</script>

<div
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
    class="min-h-screen bg-gray-100"
    style="touch-action: pan-y;"
>
    {#if pulling && pullDistance > 2}
        <div class="fixed top-0 left-0 w-full flex flex-col items-center justify-center z-50" style="height: {pulling ? pullDistance : 0}px">
            {#if refreshing}
                <div class="animate-spin">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-loader-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                </div>
            {:else}
                <div class="mask-circle" style="transform: rotate({pullDistance}deg)">
                    <svg  xmlns="http://www.w3.org/2000/svg" style="transform: translateY(${pullDistance / 2}px)"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-reload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
                </div>
            {/if}

            <p>
                {refreshing ? "Refreshing..." : "Pull to refresh"}
            </p>
        </div>
    {/if}

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
        <div style="margin-top: {pulling ? pullDistance / 2 : 0}px;">
            <XWeather weather={weatherData} useLightText />
            <div class="w-full md:px-16 mt-8 lg:p-6 p-3 text-sm text-center text-gray-400">
                <p>©2025 nexryai All rights reserved.</p>
                <p>Weather data: OpenMeteo, Geometry data: OpenStreetMap (openstreetmap.org)</p>
            </div>
        </div>
    {/if}
</div>
