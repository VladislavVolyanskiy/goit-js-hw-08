import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

getCuttentTime();

player.on('timeupdate', throttle(storeCurrentTime, 1000));

function storeCurrentTime(data) {
  return localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
}

function getCuttentTime() {
  player
    .setCurrentTime(
      JSON.parse(localStorage.getItem('videoplayer-current-time'))
    )
    // .then(function (seconds) {
    //   // seconds = the current playback position
    // })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
