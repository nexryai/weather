<script lang="ts">
    import { getContext, type Snippet } from "svelte";

    import { fade } from "svelte/transition";

    interface Props {
        code: number | undefined;
        isDay: boolean;
        useLightText: boolean;
        children: Snippet<[]>;
    }

    let { code, isDay, useLightText = $bindable<boolean>(), children }: Props = $props();
    const theme = $derived(getContext<() => string>("bgTheme")());

    let bgClass = $state("");

    $effect(() => {
        if (code === undefined) {
            bgClass = "";
            return;
        }

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
            case "unsplash1":
                useLightText = !isDay;

                // Sunny
                if ([0, 1].includes(code)) {
                    useLightText = true;
                    bgClass = isDay
                        ? "rounded-3xl w-full h-full bg-[url('https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
                        : "rounded-3xl w-full h-full bg-[url('https://images.unsplash.com/photo-1442876906995-6761040d1f0b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]";

                    return;
                }

                // Partly Cloudy
                if (code === 2) {
                    bgClass = isDay
                        ? "rounded-3xl w-full h-full bg-[url('https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] before:absolute before:inset-0 before:backdrop-blur-xl before:content-[''] before:w-full before:h-full before:z-10"
                        : "rounded-3xl w-full h-full bg-[url('https://images.unsplash.com/photo-1561394104-0904bad68355?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] before:absolute before:inset-0 before:backdrop-blur-2xl before:content-[''] before:w-full before:h-full before:z-10";

                    return;
                }

                // Cloudy
                if (code === 3) {
                    bgClass = isDay
                        ? "bg-[url('https://images.unsplash.com/photo-1534060291226-e30e7693f7ea?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] contrast-50 brightness-125 before:absolute before:inset-0 before:backdrop-blur-2xl before:content-[''] before:w-full before:h-full before:z-10"
                        : "bg-[url('https://images.unsplash.com/photo-1561394104-0904bad68355?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] before:absolute before:inset-0 before:backdrop-blur-2xl before:content-[''] before:w-full before:h-full before:z-10";

                    return;
                }

                if (!isDay) {
                    // これ以降の夜間の天候の背景は統一
                    bgClass = "bg-[url('https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] contrast-90 brightness-60 before:absolute before:inset-0 before:backdrop-blur-2xl before:content-[''] before:w-full before:h-full before:z-10";
                    return;
                }

                // Light rain
                if ([45, 48, 51, 53, 56, 57, 61, 71].includes(code)) {
                    bgClass = "bg-[url('https://images.unsplash.com/photo-1483702721041-b23de737a886?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] before:absolute before:inset-0 before:backdrop-blur-2xl before:content-[''] before:w-full before:h-full before:z-10";
                    return;
                }

                // Rain
                if ([55, 63, 65, 66, 67, 73, 75, 77].includes(code)) {
                    useLightText = true;
                    bgClass = "bg-[url('https://images.unsplash.com/photo-1649248230734-bb960c266811?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] before:absolute before:inset-0 before:backdrop-blur-xl before:content-[''] before:w-full before:h-full before:z-10";
                    return;
                }

                // Stormy
                if ([82, 95, 96, 99].includes(code)) {
                    bgClass = "bg-[url('https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] before:absolute before:inset-0 before:backdrop-blur-md before:content-[''] before:w-full before:h-full before:z-10";
                    return;
                }

                // Fallback
                bgClass = "bg-[url('https://images.unsplash.com/photo-1523882505971-5c29b55b695c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] contrast-50 brightness-125 before:absolute before:inset-0 before:backdrop-blur-2xl before:content-[''] before:w-full before:h-full before:z-10";
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

{#key bgClass}
    <div in:fade={{ duration: 300 }} id="bg" class={bgClass}>
        {@render children()}
    </div>
{/key}

<style>
#bg {
    background-size: cover;
    background-position: center;
    z-index: -1;
}
</style>
