import dayjs from "dayjs"
import relative from "dayjs/plugin/relativeTime"
dayjs.extend(relative)

export function view(data: any): string {
    try {
        let string = `<div style="text-align: center">`
        data.forEach((song: any, idx: number) => {
            let date = song.date?.uts * 1000 
            let dateInfo = '';
            if(date){
                dateInfo = dayjs(Number(song.date.uts * 1000)).fromNow()
            }
            else if(song['@attr']?.nowplaying){
                dateInfo = 'now playing'
            }
            string += `<div class="song" style="margin-left: ${Math.random() * 60}px; opacity: ${(data.length - (idx / 1.3)) / data.length * 100}%">
        <span>${song.artist['#text']}</span> - </span>${song.name} (${dateInfo})</div>`
        })
        string += `</div>`
        return string

    }
    catch (e) {
        let string = `<p>${String(e)}</p>`
        string += `<pre>${JSON.stringify(data, undefined, 2)}</pre>`
        return string
    }
}