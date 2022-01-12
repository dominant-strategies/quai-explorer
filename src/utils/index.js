export const reduceString = (string) => {
    return string.slice(0, 6) + "..."+string.slice(-5)
}

export const convertTimeString =  (string) => {
    let date = new Date(string * 1000)
    let hours = date.getHours()
    let minutes = '0' + date.getMinutes()
    let seconds = '0' + date.getSeconds()
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    return formattedTime;
}

export const numberWithCommas = (number = "0") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}