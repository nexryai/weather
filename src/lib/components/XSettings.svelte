<script lang="ts">
    import {onMount} from "svelte";

    import { fade } from "svelte/transition";

    import undrawLocationNotFound from "$lib/images/undrawAdventure.svg";
    import undrawLocationTracking from "$lib/images/undrawLocationTracking.svg";


    let showModal = $state(false);
    let cityName = $state<string>("");
    let isNotSearchedYet = $state<boolean>(true);
    let noResult = $state<boolean>(false);

    interface Props {
        useLightText: boolean;
    }

    let { useLightText = $bindable<boolean>() }: Props = $props();

    onMount(() => {
        setTimeout(() => showModal = true, 400);
    });

</script>


<div>
    {#if showModal}
        <div id="app-bg" class="backdrop-blur-2xl rounded-2xl" transition:fade={{duration: 100}}></div>
    {/if}
    <div id="background-l-noise" class="rounded-2xl"></div>
    <div id="app-modal" class="absolute rounded-2xl top-0 left-0 w-full h-full text-white p-12 shadow-lg" class:text-gray-200={useLightText}>
        <div class="flex justify-between items-center mb-8">
            <h3 class="text-3xl">Location</h3>
            <button aria-label="Close Settings" class="text-gray-200 hover:text-gray-300 focus:outline-none" onclick={() => open = !open}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="flex flex-col justify-center">
            <input type="text" placeholder="出発地を入力" bind:value={cityName} class="w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none" />
            <div class="flex flex-col justify-center items-center mt-4">
                {#if isNotSearchedYet}
                    <img src={undrawLocationTracking} alt="Location Tracking" class="w-42 mt-4" />
                    <p class="text-gray-400 mt-6 mx-auto">入力して検索開始</p>
                {:else if noResult}
                    <img src={undrawLocationNotFound} alt="Location Not Found" class="w-42 mt-4" />
                    <p class="text-gray-400 mt-6">該当する場所が見つかりませんでした</p>
                {:else}
                    <p class="text-gray-500 mt-2">検索結果が見つかりました</p>
                {/if}
            </div>
        </div>
    </div>
</div>


<style>
    #app-bg {
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
    }

    #background-l-noise {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 101;
        background-size: 52px; /* ノイズ画像の粗さを調節 */
        background-repeat: repeat;
        filter: brightness(180%); /* ノイズ画像が少し暗かったのでCSS filterで明るくする */
        background-image: url(data:image/png;base64,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);
    }

    #app-modal {
        z-index: 200;
    }
</style>
