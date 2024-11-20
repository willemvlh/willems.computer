import { getAccessToken } from "./auth";
import test from 'node:test'
import assert from 'node:assert'
import {getLastActivities } from "./strava";

test("it should give an access token", async () => {
    let token = await getAccessToken();
    assert(token)
})

test("activities", async () => {
    let a = await getLastActivities()
    console.log(a)
})


