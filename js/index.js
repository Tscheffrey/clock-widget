function Clock() {
  this.setDate(new Date());
  this.startTimer();
};

Clock.prototype = {
  seconds: 0,
  date: undefined,
  hoursNice: undefined,
  secondsNice: undefined,
  previousHours: undefined,
  previousMinutes: undefined,
  speedFactor: 1,
  running: false,
  fieldHours: $(".clock > .hours"),
  fieldMinutes: $(".clock > .minutes"),
  fieldSeconds: $("div.clock > div.seconds"),
  currentTimer: undefined,
  startTimer: function() {
    this.startTimeout();
    this.running = true;
   // console.log("timer started");
   // console.log(this.date.getTime() / 1000);
  },
  startTimeout: function() {
    this.currentTimer = setTimeout(this.onTick, 1000 / this.speedFactor, this);
  },
  onTick: function(oSelf) {
    oSelf.date = new Date();
    //oSelf.date.setTime(oSelf.date.getTime() + 1000);
//    console.log(oSelf.date.getTime() / 1000);
    oSelf.startTimeout();

    oSelf.setSecondsUi()
    oSelf.setMinutesUi();
    oSelf.setHoursUi();
  },
  stopTimer: function() {
    clearTimeout(this.currentTimer);
    this.running = false;
    console.log("timer stopped");
  },
  getSecondsPercent() {
    return this.date.getSeconds() / 60 * 100;
  },
  getHoursNice: function() {
    return this.date.getHours();
  },
  getMinutesNice: function() {
    var minutes = this.date.getMinutes().toString();
    if (minutes.length < 2) minutes = "0" + minutes.toString();
    return minutes;
  },
  setSecondsUi: function() {
    clock1.fieldSeconds.css("width", this.getSecondsPercent() + "%");
  },
  setMinutesUi: function() {
    var minutes = this.getMinutesNice();
    if (this.previousMinutes != minutes) {
      this.previousMinutes = minutes;
      this.fieldMinutes.html(minutes);
    }
  },
  setHoursUi: function() {
    var hours = this.getHoursNice();
    if (this.previousHours != hours) {
      this.previousHours = hours;
      this.fieldHours.html(hours);
    }

  },
  setDate(oDate) {
    var wasRunning = this.running; 
    if (this.running) this.stopTimer(); 
    oDate.setMilliseconds(0);
    this.date = oDate;
    if (wasRunning) this.startTimer();
  }
}

var clock1;

/*$(window).click(function() {
  if(!clock1){
    clock1 = new Clock();
    clock1.speedFactor = 1;
    clock1.setDate(new Date());
  }
  
  if(clock1.running){
    clock1.stopTimer();
  }else{
    clock1.startTimer();
  }
});*/

$(document).ready(function() {
  clock1 = new Clock();
});