class Clock{
    constructor(format){
        this.getTime = this.getTime.bind(this);
        this.format = this.verifyFormat(format);
        console.log(this.format);
    }

    verifyFormat(format){
         let formatReg = /[HMS]{0,2}%[HMS]{0,2}%[HMS]{0,2}/i;
         console.log(format);
         if(formatReg.test(format)){
            return format.split("%");
         }
         else{
             throw 'Format error';
         }
    }
    sleep(delay){
        return new Promise(resolve => {
            setTimeout(resolve,delay)
        });
    }
    async view(idName){
        while(true){
            await this.sleep(1000).then(()=>this.viewEngine(idName));
        }
    }
    getTimeNumber(timeNumber){
        let date = new Date();

        if(/H|h|HH|hh/.test(timeNumber)){
            let hour = String(date.getHours());
            if (hour.length == 1){
                return "0"+hour;
            }
            return hour;
        }
        if(/M|m|MM|mm/.test(timeNumber)){
            let minute = String(date.getMinutes());
            if (minute.length == 1){
                return "0"+minute;
            }
            return minute;
        }
        if(/S|s|SS|ss/.test(timeNumber)){
            let second = String(date.getSeconds());
            if (second.length == 1){
                return "0"+second;
            }
            return second;
        }
        else{
            throw "Format invalid";
        }
    }

    getTime(){
        let time = this.format.map((n)=>this.getTimeNumber(n));
        console.log(time);
        return time;
    }

    viewEngine(idName){
        let div = document.getElementById(idName);
        let timeDict = this.getTime();
        let time = timeDict[0]+":"+timeDict[1]+":"+timeDict[2];
        div.innerHTML = time;
    }
}
var clock = new Clock("HH%sm%S");
clock.view('clock');
