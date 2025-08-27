import { weatherService, geocodingService } from "skyflame";

import type { WeatherData } from "$lib/types";

import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ request, cookies }) => {
    const lat = Number(cookies.get("lat") ?? request.headers.get("X-Vercel-IP-Latitude") ?? 35.462261);
    const lon = Number(cookies.get("lon") ?? request.headers.get("X-Vercel-IP-Longitude") ?? 139.632239);

    let error = null;
    try {
        let weather: WeatherData | null = null;
        let cityName: string | null = null;

        await Promise.all([
            (async () => {
                weather = await weatherService.getOverview(lat, lon) as WeatherData;
            })(),
            (async () => {
                const res = await geocodingService.reverseGeocoding(lat.toString(), lon.toString());
                cityName = res.address.city ?? res.address.town ?? res.display_name ?? null;
            })()
        ]);

        return { weather, cityName, error };
    } catch (err) {
        console.error("Error parsing weather data:", err);
        error = err instanceof Error ? err.message : "Unknown error";
    }

    return {
        weather: null,
        cityName: null,
        error
    };
};
