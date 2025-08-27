import { weatherService } from "skyflame";

import type { WeatherData } from "$lib/types";

import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ request }) => {
    const ipLat = request.headers.get("X-Vercel-IP-Latitude");
    const ipLon = request.headers.get("X-Vercel-IP-Longitude");

    let error = null;
    try {
        const res = await weatherService.getOverview(
            Number(ipLat ?? 35.462261) ,
            Number(ipLon ?? 139.632239)
        );

        const weatherData = res as WeatherData;

        return { weather: weatherData, error };
    } catch (err) {
        console.error("Error parsing weather data:", err);
        error = err instanceof Error ? err.message : "Unknown error";
    }

    return {
        weather: null,
        error
    };
};
