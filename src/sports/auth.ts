import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'


type Tokens = {
    refresh_token: string,
    access_token: string,
    expires_at: number
}

export async function getAccessToken() {
    let tokens = JSON.parse(readFileSync(join(__dirname, "tokens.json")).toString()) as Tokens
    if (tokens.expires_at * 1000 > Date.now()) {
        return tokens.access_token
    }
    else {
        tokens = await refresh(tokens.refresh_token);
        writeFileSync(join(__dirname, 'tokens.json'), JSON.stringify(tokens))
        return tokens.access_token
    }

}

async function refresh(token: string): Promise<Tokens> {
    const clientId = process.env['STRAVA_CLIENT_ID']
    const clientSecret = process.env['STRAvA_CLIENT_SECRET']
    if(!clientId || !clientSecret){
        throw new Error(`Missing client id or secret`);
    };
    let formData = new FormData()
    formData.append('client_id', clientId)
    formData.append('client_secret',clientSecret)
    formData.append('grant_type', 'refresh_token')
    formData.append('refresh_token', token)

    let resp = await fetch('https://www.strava.com/api/v3/oauth/token', {
        body: formData,
        method: 'POST'
    })

    let body = await resp.json()

    if (!resp.ok) {
        throw new Error("response not ok! " + JSON.stringify(body))
    }


    let { refresh_token, access_token, expires_at } = body
    let tokens: Tokens = { refresh_token, access_token, expires_at }
    return tokens



}

function saveToken() {

}