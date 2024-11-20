export type Activity = {
    id: number
    moving_time: number,
    elapsed_time: number,
    start_date: string,
    type: string,
    average_heartrate?: number,
    max_heartrate: number
}

export type DetailedActivity = Activity & {
    calories: number
}