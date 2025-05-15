export default interface OpenLesson {
    id: number,
    format: string,
    practical: boolean,
    date: string,
    time: string,
    times: string[],
    weekDay: string
}