<script lang="ts">
    import { getContext } from "svelte";

    import { fade } from "svelte/transition";

    interface Props {
        code: number;
        isDay?: boolean;
    }

    const { code, isDay }: Props = $props();
    const theme = $derived(getContext<() => string>("iconTheme")());

    const baseUrl = $derived<string>(
        theme === "openweathermap" ? "https://openweathermap.org/img/wn/"
            : theme === "meteocons" ? "https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/fill/svg-static/"
                : theme === "meteocons-anim" ? "https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/production/animated/svg/"
                    : "https://cdn.jsdelivr.net/gh/meteocons/meteocons@latest/svg/"
    );

    const icons = $derived<Record<number, { day: { description: string; image: string }, night: { description: string; image: string } }>>(
        theme === "openweathermap" ? {
            0: {
                day: { description: "Sunny", image: "01d@2x.png" },
                night: { description: "Clear", image: "01n@2x.png" }
            },
            1: {
                day: { description: "Mainly Sunny", image: "01d@2x.png" },
                night: { description: "Mainly Clear", image: "01n@2x.png" }
            },
            2: {
                day: { description: "Partly Cloudy", image: "02d@2x.png" },
                night: { description: "Partly Cloudy", image: "02n@2x.png" }
            },
            3: {
                day: { description: "Cloudy", image: "03d@2x.png" },
                night: { description: "Cloudy", image: "03n@2x.png" }
            },
            45: {
                day: { description: "Foggy", image: "50d@2x.png" },
                night: { description: "Foggy", image: "50n@2x.png" }
            },
            48: {
                day: { description: "Rime Fog", image: "50d@2x.png" },
                night: { description: "Rime Fog", image: "50n@2x.png" }
            },
            51: {
                day: { description: "Light Drizzle", image: "09d@2x.png" },
                night: { description: "Light Drizzle", image: "09n@2x.png" }
            },
            53: {
                day: { description: "Drizzle", image: "09d@2x.png" },
                night: { description: "Drizzle", image: "09n@2x.png" }
            },
            55: {
                day: { description: "Heavy Drizzle", image: "09d@2x.png" },
                night: { description: "Heavy Drizzle", image: "09n@2x.png" }
            },
            56: {
                day: { description: "Light Freezing Drizzle", image: "09d@2x.png" },
                night: { description: "Light Freezing Drizzle", image: "09n@2x.png" }
            },
            57: {
                day: { description: "Freezing Drizzle", image: "09d@2x.png" },
                night: { description: "Freezing Drizzle", image: "09n@2x.png" }
            },
            61: {
                day: { description: "Light Rain", image: "10d@2x.png" },
                night: { description: "Light Rain", image: "10n@2x.png" }
            },
            63: {
                day: { description: "Rain", image: "10d@2x.png" },
                night: { description: "Rain", image: "10n@2x.png" }
            },
            65: {
                day: { description: "Heavy Rain", image: "10d@2x.png" },
                night: { description: "Heavy Rain", image: "10n@2x.png" }
            },
            66: {
                day: { description: "Light Freezing Rain", image: "10d@2x.png" },
                night: { description: "Light Freezing Rain", image: "10n@2x.png" }
            },
            67: {
                day: { description: "Freezing Rain", image: "10d@2x.png" },
                night: { description: "Freezing Rain", image: "10n@2x.png" }
            },
            71: {
                day: { description: "Light Snow", image: "13d@2x.png" },
                night: { description: "Light Snow", image: "13n@2x.png" }
            },
            73: {
                day: { description: "Snow", image: "13d@2x.png" },
                night: { description: "Snow", image: "13n@2x.png" }
            },
            75: {
                day: { description: "Heavy Snow", image: "13d@2x.png" },
                night: { description: "Heavy Snow", image: "13n@2x.png" }
            },
            77: {
                day: { description: "Snow Grains", image: "13d@2x.png" },
                night: { description: "Snow Grains", image: "13n@2x.png" }
            },
            80: {
                day: { description: "Light Showers", image: "09d@2x.png" },
                night: { description: "Light Showers", image: "09n@2x.png" }
            },
            81: {
                day: { description: "Showers", image: "09d@2x.png" },
                night: { description: "Showers", image: "09n@2x.png" }
            },
            82: {
                day: { description: "Heavy Showers", image: "09d@2x.png" },
                night: { description: "Heavy Showers", image: "09n@2x.png" }
            },
            85: {
                day: { description: "Light Snow Showers", image: "13d@2x.png" },
                night: { description: "Light Snow Showers", image: "13n@2x.png" }
            },
            86: {
                day: { description: "Snow Showers", image: "13d@2x.png" },
                night: { description: "Snow Showers", image: "13n@2x.png" }
            },
            95: {
                day: { description: "Thunderstorm", image: "11d@2x.png" },
                night: { description: "Thunderstorm", image: "11n@2x.png" }
            },
            96: {
                day: { description: "Light Thunderstorms With Hail", image: "11d@2x.png" },
                night: { description: "Light Thunderstorms With Hail", image: "11n@2x.png" }
            },
            99: {
                day: { description: "Thunderstorm With Hail", image: "11d@2x.png" },
                night: { description: "Thunderstorm With Hail", image: "11n@2x.png" }
            }
        } : theme === "meteocons" || theme === "meteocons-anim" ? {
            0: {
                day: { description: "Sunny", image: "clear-day.svg" },
                night: { description: "Clear", image: "clear-night.svg" }
            },
            1: {
                day: { description: "Mainly Sunny", image: "clear-day.svg" },
                night: { description: "Mainly Clear", image: "clear-night.svg" }
            },
            2: {
                day: { description: "Partly Cloudy", image: "partly-cloudy-day.svg" },
                night: { description: "Partly Cloudy", image: "partly-cloudy-night.svg" }
            },
            3: {
                day: { description: "Cloudy", image: "cloudy.svg" },
                night: { description: "Cloudy", image: "cloudy.svg" }
            },
            45: {
                day: { description: "Foggy", image: "fog.svg" },
                night: { description: "Foggy", image: "fog.svg" }
            },
            48: {
                day: { description: "Rime Fog", image: "fog.svg" },
                night: { description: "Rime Fog", image: "fog.svg" }
            },
            51: {
                day: { description: "Light Drizzle", image: "drizzle.svg" },
                night: { description: "Light Drizzle", image: "drizzle.svg" }
            },
            53: {
                day: { description: "Drizzle", image: "drizzle.svg" },
                night: { description: "Drizzle", image: "drizzle.svg" }
            },
            55: {
                day: { description: "Heavy Drizzle", image: "extreme-drizzle.svg" },
                night: { description: "Heavy Drizzle", image: "extreme-drizzle.svg" }
            },
            56: {
                day: { description: "Light Freezing Drizzle", image: "drizzle.svg" },
                night: { description: "Light Freezing Drizzle", image: "drizzle.svg" }
            },
            57: {
                day: { description: "Freezing Drizzle", image: "drizzle.svg" },
                night: { description: "Freezing Drizzle", image: "drizzle.svg" }
            },
            61: {
                day: { description: "Light Rain", image: "rain.svg" },
                night: { description: "Light Rain", image: "rain.svg" }
            },
            63: {
                day: { description: "Rain", image: "overcast-rain.svg" },
                night: { description: "Rain", image: "overcast-rain.svg" }
            },
            65: {
                day: { description: "Heavy Rain", image: "extreme-rain.svg" },
                night: { description: "Heavy Rain", image: "extreme-rain.svg" }
            },
            66: {
                day: { description: "Light Freezing Rain", image: "sleet.svg" },
                night: { description: "Light Freezing Rain", image: "sleet.svg" }
            },
            67: {
                day: { description: "Freezing Rain", image: "overcast-sleet.svg" },
                night: { description: "Freezing Rain", image: "overcast-sleet.svg" }
            },
            71: {
                day: { description: "Light Snow", image: "snow.svg" },
                night: { description: "Light Snow", image: "snow.svg" }
            },
            73: {
                day: { description: "Snow", image: "overcast-snow.svg" },
                night: { description: "Snow", image: "overcast-snow.svg" }
            },
            75: {
                day: { description: "Heavy Snow", image: "extreme-snow.svg" },
                night: { description: "Heavy Snow", image: "extreme-snow.svg" }
            },
            77: {
                day: { description: "Snow Grains", image: "snow.svg" },
                night: { description: "Snow Grains", image: "snow.svg" }
            },
            80: {
                day: { description: "Light Showers", image: "rain.svg" },
                night: { description: "Light Showers", image: "rain.svg" }
            },
            81: {
                day: { description: "Showers", image: "overcast-rain.svg" },
                night: { description: "Showers", image: "overcast-rain.svg" }
            },
            82: {
                day: { description: "Heavy Showers", image: "extreme-rain.svg" },
                night: { description: "Heavy Showers", image: "extreme-rain.svg" }
            },
            85: {
                day: { description: "Light Snow Showers", image: "snow.svg" },
                night: { description: "Light Snow Showers", image: "snow.svg" }
            },
            86: {
                day: { description: "Snow Showers", image: "overcast-snow.svg" },
                night: { description: "Snow Showers", image: "overcast-snow.svg" }
            },
            95: {
                day: { description: "Thunderstorm", image: "thunderstorms-extreme-rain.svg" },
                night: { description: "Thunderstorm", image: "thunderstorms-extreme-rain.svg" }
            },
            96: {
                day: { description: "Light Thunderstorms With Hail", image: "thunderstorms-overcast-rain.svg" },
                night: { description: "Light Thunderstorms With Hail", image: "thunderstorms-overcast-rain.svg" }
            },
            99: {
                day: { description: "Thunderstorm With Hail", image: "thunderstorms-extreme-rain.svg" },
                night: { description: "Thunderstorm With Hail", image: "thunderstorms-extreme-rain.svg" }
            }
        } : {});

    // デフォルト
    const fallback = {
        description: "Unknown",
        image: "01d@2x.png"
    };

    const icon = $derived(icons[code]?.[isDay ? "day" : "night"] ?? fallback);
</script>

{#key icon}
    <img
        in:fade={{ duration: 300 }}
        src={`${baseUrl}/${icon.image}`}
        alt={icon.description}
        title={icon.description}
        class="w-16 h-16 inline-block align-middle"
    />
{/key}
<span class="ml-2 align-middle text-gray-700">{icon.description}</span>
