import './App.css';
import React from 'react';
import $ from 'jquery';

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [counting, setCounting] = React.useState(false); //check if clock id counting down//true or stop//false
  const [timeSection, setTimeSection] = React.useState('session');
  const timerLabel = timeSection === 'session' ? 'Session' : 'Break';
  const [remainTime, setRemainTime] = React.useState(1500);//in seconds
  
  const countdown = setTimeout(()=>{
    if(counting && remainTime > 0){
      setRemainTime(remainTime - 1);
    }
  }, 1000);
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1);
      if(timeSection==='session'){
        setRemainTime((sessionLength - 1) * 60);
      }
    }
  }
  const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1);
      if(timeSection==='session'){
        setRemainTime((sessionLength + 1) * 60);
      }
    }
  }
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1);
      if(timeSection==='break'){
        setRemainTime((breakLength - 1) * 60);
      }
    }
  }
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1);
      if(timeSection==='break'){
        setRemainTime((breakLength + 1) * 60);
      }
    }
  }

  const handleStartStopIcon = () => {
    if(counting){
      $('#start_stop').html('<i class="fa-solid fa-play"></i>');
      clearTimeout(countdown);//stop counting down
    }
    else{
      $('#start_stop').html('<i class="fa-solid fa-pause"></i>');
    }
    setCounting(!counting);
  }
  
  const handleReset = () => {
    clearTimeout(countdown);
    setCounting(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimeSection('session');
    $('#start_stop').html('<i class="fa-solid fa-play"></i>');
    setRemainTime(1500);
    const audio = $('#beep')[0];
    audio.pause();
    audio.currentTime = 0;
  }
  
  const changeTimeSection = () => {
    if(timeSection==='session'){
      setTimeSection('break');
      setRemainTime(breakLength * 60);
    }
    else if(timeSection==='break'){
      setTimeSection('session');
      setRemainTime(sessionLength * 60);
    }
    const audio = $('#beep')[0];
    audio.play();
      const timer = setTimeout(()=>{
        audio.pause();
        clearTimeout(timer);
      }, 4000);
  }
  
  const format = () => {
    const minutes = Math.floor(remainTime / 60);
    const seconds = remainTime - minutes * 60;
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  };
  
  const updating = () => {
    if(counting){
      const mention = countdown;
      if(remainTime<=0){
        changeTimeSection();
      }
    }
  }
  
  React.useEffect(()=>{
    updating()
  }, [counting, remainTime]);
  
  return (
    <div id='big-wrapper'>
      <h1>25 + 5 Clock</h1>
      <div id='length-div'>
        <div id='length'>
          <div id='session-wrapper'>
            <label id='session-label' className='length-label'>Session Length</label>
            <div className='input'>
              <button id='session-decrement' onClick={handleSessionDecrease} className='decrement session-buttons' disabled={counting}><i className="fa-solid fa-sort-down"></i></button>
              <div id='session-length' className='time-length'>{sessionLength}</div>
              <button id='session-increment' onClick={handleSessionIncrease} className='increment session-buttons' disabled={counting}><i className="fa-solid fa-sort-up"></i></button>
            </div>
          </div>
          <div id='break-wrapper'>
            <label id='break-label' className='length-label'>Break Length</label>
            <div className='input'>
              <button id='break-decrement' onClick={handleBreakDecrease} className='decrement break-buttons' disabled={counting}><i className="fa-solid fa-sort-down"></i></button>
              <div id='break-length' className='time-length'>{breakLength}</div>
              <button id='break-increment' onClick={handleBreakIncrease} className='increment break-buttons' disabled={counting}><i className="fa-solid fa-sort-up"></i></button>
            </div>
          </div>
        </div>
        <div id='display-control'>
          <div id='display'>
            <label id='timer-label'>{timerLabel}</label>
            <div id='time-left'>{format()}</div>
          </div>
          <div id='control'>
            <button id='start_stop' onClick={handleStartStopIcon}><i className="fa-solid fa-play"></i></button>
            <button id='reset' onClick={handleReset}><i className="fa-solid fa-rotate-left"></i></button>
          </div>
        </div>
        <audio id='beep' src='https://cdn.discordapp.com/attachments/799558368657801239/984416293186850866/Cool-alarm-tone-notification-sound.mp3' preload='auto'></audio>
      </div>
      <div id='credit'>
        <div id='code-guide'>code guiding from <a href='https://www.youtube.com/c/DwinaTech-coding'  className='credit-a'>Youtube DwinaTech</a></div>
        <div id='background'>
          <a href='https://www.freepik.com/vectors/springtime'  className='credit-a'>Springtime vector created by pikisuperstar - www.freepik.com</a>
        </div>
        <div id='alarm-sound'>
          alarm sound from <a href='https://orangefreesounds.com/cool-alarm-tone-notification-sound/'  className='credit-a'>orangefreesounds</a> used under license<br/><a href='https://creativecommons.org/licenses/by-nc/4.0/'  className='credit-a'>Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)</a>
        </div>
      </div>
    </div>
  );
}

export default App;
