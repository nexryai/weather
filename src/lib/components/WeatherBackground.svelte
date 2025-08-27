<script lang="ts">
    import { type Snippet } from "svelte";

    import { fade } from "svelte/transition";

    interface Props {
        code: number | undefined;
        isDay: boolean;
        useLightText: boolean;
        children: Snippet<[]>;
    }

    let { code, isDay, useLightText = $bindable<boolean>(), children }: Props = $props();

    let bgClass = $state("");

    $effect(() => {
        if (code === undefined) {
            bgClass = "";
            return;
        }

        useLightText = !isDay;

        // Sunny
        if ([0, 1].includes(code)) {
            useLightText = true;
            bgClass = isDay
                ? "bg-[url('/images/sunny.avif')]"
                : "bg-[url('/images/clear-night.avif')]";

            return;
        }

        // Partly Cloudy
        if (code === 2) {
            bgClass = isDay
                ? "bg-[url('/images/sunny.avif')] "
                : "bg-[url('/images/night.avif')] ";

            return;
        }

        // Cloudy
        if (code === 3) {
            bgClass = isDay
                ? "bg-[url('/images/cloud1.avif')]"
                : "bg-[url('/images/night.avif')] ";

            return;
        }

        if (!isDay) {
            // これ以降の夜間の天候の背景は統一
            bgClass = "bg-[url('/images/cloudy-night.avif')] ";
            return;
        }

        // Light rain
        if ([45, 48, 51, 53, 56, 57, 61, 71].includes(code)) {
            bgClass = "bg-[url('/images/cloud2.avif')] ";
            return;
        }

        // Rain
        if ([55, 63, 65, 66, 67, 73, 75, 77].includes(code)) {
            useLightText = true;
            bgClass = "bg-[url('/images/rainy.avif')] ";
            return;
        }

        // Stormy
        if ([82, 95, 96, 99].includes(code)) {
            bgClass = "bg-[url('/images/stormy.avif')] ";
            return;
        }

        // Fallback
        bgClass = "bg-[url('/images/evening.avif')] ";
    });
</script>

{#key bgClass}
    <div in:fade={{ duration: 300 }} id="bg" class={`rounded-3xl w-full ${bgClass}`}>
        <div class="backdrop-blur-2xl rounded-3xl">
            {@render children()}
        </div>
    </div>
{/key}

<style>
#bg {
    background-size: cover;
    background-position: center;
    z-index: -1;
}
</style>
