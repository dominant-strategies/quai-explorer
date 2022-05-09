export const reduceString = (string) =>
    `${string.slice(0, 6)}...${string.slice(-5)}`

export const reduceStringShowMediumLength = (string) =>
    `${string.slice(0, 10)}...${string.slice(-9)}`

export const reduceStringShowMore = (string) =>
    `${string.slice(0, 14)}...${string.slice(-14)}`

export const convertTimeString = (string) => {
    const date = new Date(string * 1000)
    const hours = date.getHours()
    const minutes = `0${date.getMinutes()}`
    const seconds = `0${date.getSeconds()}`
    const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
    return formattedTime
}

export const numberWithCommas = (number = '0') =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const toQuai = (gweiValue) => gweiValue / 10 ** 18
