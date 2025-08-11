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
                ? "bg-[url('https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
                : "bg-[url('https://images.unsplash.com/photo-1442876906995-6761040d1f0b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]";

            return;
        }

        // Partly Cloudy
        if (code === 2) {
            bgClass = isDay
                ? "bg-[url('https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] "
                : "bg-[url('https://images.unsplash.com/photo-1561394104-0904bad68355?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ";

            return;
        }

        // Cloudy
        if (code === 3) {
            bgClass = isDay
                ? "bg-[url('https://images.unsplash.com/photo-1534060291226-e30e7693f7ea?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
                : "bg-[url('https://images.unsplash.com/photo-1561394104-0904bad68355?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ";

            return;
        }

        if (!isDay) {
            // これ以降の夜間の天候の背景は統一
            bgClass = "bg-[url('https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]";
            return;
        }

        // Light rain
        if ([45, 48, 51, 53, 56, 57, 61, 71].includes(code)) {
            bgClass = "bg-[url('https://images.unsplash.com/photo-1483702721041-b23de737a886?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ";
            return;
        }

        // Rain
        if ([55, 63, 65, 66, 67, 73, 75, 77].includes(code)) {
            useLightText = true;
            bgClass = "bg-[url('https://images.unsplash.com/photo-1649248230734-bb960c266811?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ";
            return;
        }

        // Stormy
        if ([82, 95, 96, 99].includes(code)) {
            bgClass = "bg-[url('https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]";
            return;
        }

        // Fallback
        bgClass = "bg-[url('https://images.unsplash.com/photo-1523882505971-5c29b55b695c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]";
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
