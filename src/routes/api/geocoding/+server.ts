import { error } from "@sveltejs/kit";
import { geocodingService } from "skyflame";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
    const query = url.searchParams.get("query");
    if (!query) {
        error(400, "Missing 'query' parameter");
    }

    const res = await geocodingService.geocoding(query);

    return new Response(JSON.stringify(res), {
        headers: { "Content-Type": "application/json" }
    });
};
