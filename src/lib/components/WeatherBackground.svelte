<script lang="ts">
    import { getContext } from "svelte";

    interface Props {
        code: number;
        isDay?: boolean;
    }

    const { code = $bindable<number>(), isDay = $bindable<boolean>() }: Props = $props();
    const theme = $derived(getContext<() => string>("bgTheme")());

    const bgClass = $derived.by(() => {
        switch (theme) {
            case "gradient":
                // Sunny
                if ([0, 1].includes(code)) {
                    return isDay
                        ? "bg-gradient-to-tl from-blue-500 from-0% via-blue-400 via-70% to-red-50 to-100%"
                        : "bg-gradient-to-tl from-slate-900 from-0% via-slate-800 via-60% to-slate-500 to-100%";
                }

                if (!isDay) {
                    // これ以降の夜間の天候の背景は統一
                    return "bg-gradient-to-tl from-gray-600 from-0% via-gray-800 via-50% to-slate-800 to-100%";
                }

                // Partly Cloudy
                if (code === 2) {
                    return "bg-gradient-to-tl from-blue-200 from-0% via-slate-200 via-50% to-slate-50 to-100%";
                }

                // Cloudy
                if (code === 3) {
                    return "bg-gradient-to-tl from-blue-50 from-0% via-slate-300 via-50% to-slate-50 to-100%";
                }

                // Light rain
                if ([45, 48, 51, 53, 56, 57, 61, 71].includes(code)) {
                    return "bg-gradient-to-tl from-slate-400 from-0% via-slate-300 via-50% to-slate-100 to-100%";
                }

                // Rain
                if ([55, 63, 65, 66, 67, 73, 75, 77].includes(code)) {
                    return "bg-gradient-to-tl from-slate-500 from-0% via-slate-400 via-50% to-slate-400 to-100%";
                }

                // Stormy
                if ([82, 95, 96, 99].includes(code)) {
                    return "bg-gradient-to-tl from-slate-600 from-0% via-slate-500 via-50% to-slate-500 to-100%";
                }

                // Fallback
                return "bg-gradient-to-tl from-slate-500 from-0% via-slate-400 via-50% to-slate-400 to-100%";
            case "weathericons":
                return `wi wi-owm-${code}`;
            case "openweathermap":
                return `owm ow-${code}`;
            default:
                return "bg-gradient-to-tl from-blue-500 from-0% via-blue-400 via-50% to-red-50 to-100%";
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
