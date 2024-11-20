import { DetailedActivity } from "./types";
import dayjs from "dayjs";
import relative from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

dayjs.extend(relative)
dayjs.extend(duration)

const activityMap: Record<string, string> = {
    'Ride': 'Bike ride',
    'WeightTraining': 'Weight training',
    'EBikeRide': 'Bike ride ⚡'
}

export function view(activities: DetailedActivity[]) {
    let str = `<table style="width: 100%">
<tr>
    <th>Date</th>
    <th>Type</th>
    <th>Moving time</th>
    <th>Avg heart rate</th>
    <th>Max heart rate</th>
    <th>Kcal</th>
</tr>`
    activities.forEach(a => {
        str += `<tr>
    <td>${dayjs(a.start_date).fromNow()}</td>
    <td>${activityMap[a.type] ?? a.type}</td>
    <td>${dayjs.duration(a.moving_time, 'second').format('mm:ss')}</td>
    <td>${a.average_heartrate ?? ''}</td>
    <td>${a.max_heartrate ?? ''}</td>
    <td>${a.calories}
    </tr>`
    })
    str += '</table>'
    return str
}