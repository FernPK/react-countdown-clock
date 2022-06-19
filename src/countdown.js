import $ from 'jquery';

class CountDown {
  constructor(sessionLength, breakLength, renderMin, renderSec, soundId) {
    this.timeRemaining = sessionLength;
    this.timeStop = sessionLength;
    this.initialTime = 'session';
    this.sessionLength = sessionLength;
    this.breakLength = breakLength;
    this.renderMin = renderMin;
    this.renderSec = renderSec;
    this.soundId = soundId;
  }
  format = (t) => {
    return t < 10 ? '0' + t : t;
  }
  blankReset(){
    $('#start_stop').html('<i class="fa-solid fa-play"></i>');
    this.timeRemaining = 0;
    this.timeStop = 25 * 60 * 1000;
    this.initialTime = 'session';
    $(this.soundId)[0].pause();
    $(this.soundId)[0].currentTime = 0;
    $(this.renderMin).text('25');
    $(this.renderSec).text('00');
    $('#timer-label').text('Session');
  }
  startSession(){
    this.timeRemaining = this.timeStop;
    if (this.timeRemaining > 0) {
      $('#timer-label').text('Session');
      $('#start_stop').html('<i class="fa-solid fa-pause"></i>');
      this.update();
      const intervalId = setInterval(() => {
        this.timeRemaining -= 1000;
        if(this.timeStop <= 0){
          clearInterval(intervalId);
          $(this.soundId)[0].currentTime = 0;
          const playPromise = $(this.soundId)[0].play();
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              const timer = setInterval(()=>{
                $(this.soundId)[0].pause();
                clearTimeout(timer);
              }, 4000);
            })
            .catch(error => {
              console.log('something error');
            });
          }
          this.timeRemaining = this.breakLength;
          this.timeStop = this.breakLength;
          this.initialTime = 'break';
          this.startBreak();
        }
        else if(this.timeRemaining < 0){
          clearInterval(intervalId);
        }
        else {
          this.timeStop -= 1000;
          this.update();
        }
      }, 1000);
    }
  }
  startBreak(){
    this.timeRemaining = this.timeStop;
    if (this.timeRemaining > 0) {
      $('#timer-label').text('Break');
      $('#start_stop').html('<i class="fa-solid fa-pause"></i>');
      $(this.renderMin).text(this.format(this.getTime().minutes));
      this.update();
      const intervalId = setInterval(() => {
        this.timeRemaining -= 1000;
        if(this.timeStop <= 0){
          clearInterval(intervalId);
          $(this.soundId)[0].currentTime = 0;
          const playPromise = $(this.soundId)[0].play();
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              const timer = setInterval(()=>{
                $(this.soundId)[0].pause();
                clearTimeout(timer);
              }, 4000);
            })
            .catch(error => {
              console.log('something error');
            });
          }
          this.timeRemaining = this.sessionLength;
          this.timeStop = this.sessionLength;
          this.initialTime = 'session';
          this.startSession();
        }
        else if(this.timeRemaining < 0){
          clearInterval(intervalId);
        }
        else {
          this.timeStop -= 1000;
          this.update();
        }
      }, 1000);
    }
  }
  getTime(){
    return {
      minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
      seconds: Math.floor(this.timeRemaining / 1000) % 60
    };
  }
  update() {
    $(this.renderMin).text(this.format(this.getTime().minutes));
    $(this.renderSec).text(this.format(this.getTime().seconds));
    console.log(this.timeRemaining);
  }
  stop(){
    $('#start_stop').html('<i class="fa-solid fa-play"></i>');
    this.timeStop = this.timeRemaining;
    this.timeRemaining = 0; //try to clearInterval
  }
}

export default CountDown;