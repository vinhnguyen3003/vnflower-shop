

export const countdownTime = (endTime) => {console.log(typeof(endTime))
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;

    let countDown = new Date(endTime).getTime(),
        x = setInterval(function() {
  
        let now = new Date().getTime(),
            distance = countDown - now;
        if(endTime === 'reset') return clearInterval(x);
        if(!distance) return;
        let days = Math.floor(distance / (day));
        let hours = Math.floor((distance % (day)) / (hour));
        let minutes = Math.floor((distance % (hour)) / (minute));
        let seconds = Math.floor((distance % (minute)) / second);
        //let dayString = `0${days}`.slice(-2);
        let hourString = `0${hours}`.slice(-2);
        let minuteString = `0${minutes}`.slice(-2);
        let secondString = `0${seconds}`.slice(-2);

        if (!document.getElementById("days")) {
            return clearInterval(x);
        }
        //console.log(minuteString)
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hourString;
        document.getElementById("minutes").innerText = minuteString;
        document.getElementById("seconds").innerText = secondString;
  
        //do something later when date is reached
        if (distance < 0) {
            document.getElementById("days").innerText = '0';
            document.getElementById("hours").innerText = '0';
            document.getElementById("minutes").innerText = '0';
            document.getElementById("seconds").innerText = '0';
            clearInterval(x);
        }
    }, 1000)
    
};
export const createCurrentTime = () =>{
    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
}
export const countdownTime2 = (endTime) =>{
    var endTimeObj = new Date(endTime);
    
    var currentTimeObj = new Date(createCurrentTime());
    var distance = endTimeObj - currentTimeObj;

    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));//+ (days * 24)
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var hourString = `0${hours}`.slice(-2);
    var minuteString = `0${minutes}`.slice(-2);
    var secondString = `0${seconds}`.slice(-2);

    return [days, hourString, minuteString, secondString, distance];
}

export const getDD_MM_YYYY = (date) => {
    let da = date;
    if(typeof(da) === "string"){ da = new Date(Date.parse(date)); } //parse chuyển String -> numberTime; new Date chuyển từ numberTime -> date
    return da.getDate() + '/' + (da.getMonth() + 1) + '/' + da.getFullYear();
    //getMont() + 1 vì method này trả giá trị từ 0 -> 11
}

export const getFullTime = (date) => {
    let da = date;
    if(typeof(da) === "string"){ da = new Date(Date.parse(date)); } //parse chuyển String -> numberTime; new Date chuyển từ numberTime -> date
    
    return da.getDate() + '/' + 
        (da.getMonth() + 1) + '/' + 
        da.getFullYear() + '  ' + 
        `0${da.getHours()}`.slice(-2) + ':' + 
        `0${da.getMinutes()}`.slice(-2);
    //getMont() + 1 vì method này trả giá trị từ 0 -> 11
}

const convertToStringDate = (date) => {

}