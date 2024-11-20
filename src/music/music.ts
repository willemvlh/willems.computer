export async function getLastPlayedTracks() {
    const key = process.env.LAST_FM_API_KEY
    if(!key){
        throw new Error("No Last.fm key found")
    }
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=wooz&api_key=${key}&format=json`
    try {
        const resp = await fetch(url)
        if(!resp.ok){
            throw new Error("Bad last fm response! " + resp.statusText)
        }
        const json = await resp.json()
        return json.recenttracks.track.slice(0, 20);
    }
    catch (e) {
        console.log(e)
        return []
    }

}

