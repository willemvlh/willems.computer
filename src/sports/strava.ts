import { getAccessToken } from "./auth";
import { Activity, DetailedActivity } from "./types";

export async function getLastActivities(): Promise<DetailedActivity[]> {
    let token = await getAccessToken();
    let response = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=10", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    if (!response.ok) {
        throw new Error("Bad response " + await response.text())
    }
    else {
        let json: Activity[] = await response.json()
        let ids = json.filter(a => a.moving_time >= 600).map(a => a.id.toString())
        let requests = ids.map(id => fetch("https://www.strava.com/api/v3/activities/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }))
        let responses = await Promise.all(requests);
        return await Promise.all(responses.map(r => r.json()))
    }
}