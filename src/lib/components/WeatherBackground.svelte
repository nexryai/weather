<script lang="ts">
    import { getContext } from "svelte";

    interface Props {
        code: number;
        isDay: boolean;
        useLightText: boolean;
    }

    let { code = $bindable<number>(), isDay = $bindable<boolean>(), useLightText = $bindable<boolean>() }: Props = $props();
    const theme = $derived(getContext<() => string>("bgTheme")());

    let bgClass = $state("");

    $effect(() => {
        switch (theme) {
            case "gradient":
                useLightText = !isDay;

                // Sunny
                if ([0, 1].includes(code)) {
                    useLightText = true;
                    bgClass = isDay
                        ? "bg-gradient-to-tl from-blue-500 from-0% via-blue-400 via-70% to-red-50 to-100%"
                        : "bg-gradient-to-tl from-slate-900 from-0% via-slate-800 via-60% to-slate-500 to-100%";

                    return;
                }

                if (!isDay) {
                    // これ以降の夜間の天候の背景は統一
                    bgClass = "bg-gradient-to-tl from-gray-600 from-0% via-gray-800 via-50% to-slate-800 to-100%";
                    return;
                }

                // Partly Cloudy
                if (code === 2) {
                    bgClass = "bg-gradient-to-tl from-blue-200 from-0% via-slate-200 via-50% to-slate-50 to-100%";
                    return;
                }

                // Cloudy
                if (code === 3) {
                    bgClass = "bg-gradient-to-tl from-blue-50 from-0% via-slate-300 via-50% to-slate-50 to-100%";
                    return;
                }

                // Light rain
                if ([45, 48, 51, 53, 56, 57, 61, 71].includes(code)) {
                    bgClass = "bg-gradient-to-tl from-slate-400 from-0% via-slate-300 via-50% to-slate-100 to-100%";
                    return;
                }

                // Rain
                if ([55, 63, 65, 66, 67, 73, 75, 77].includes(code)) {
                    useLightText = true;
                    bgClass = "bg-gradient-to-tl from-slate-500 from-0% via-slate-400 via-50% to-slate-400 to-100%";
                    return;
                }

                // Stormy
                if ([82, 95, 96, 99].includes(code)) {
                    bgClass = "bg-gradient-to-tl from-slate-600 from-0% via-slate-500 via-50% to-slate-500 to-100%";
                    return;
                }

                // Fallback
                bgClass = "bg-gradient-to-tl from-slate-500 from-0% via-slate-400 via-50% to-slate-400 to-100%";
                break;
            case "weathericons":
                bgClass = `wi wi-owm-${code}`;
                break;
            case "openweathermap":
                bgClass = `owm ow-${code}`;
                break;
            default:
                bgClass = "bg-gradient-to-tl from-blue-500 from-0% via-blue-400 via-50% to-red-50 to-100%";
                break;
        }
    });
</script>

<div id="app-bg" class={bgClass}></div>

<style>
    #app-bg {
        background-size: cover;
        background-position: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
    }
</style>
