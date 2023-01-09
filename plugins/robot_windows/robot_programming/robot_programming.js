import RobotWindow from 'https://cyberbotics.com/wwi/R2023a/RobotWindow.js';

window.robotWindow = new RobotWindow();
const competitionName = 'Robot Programming';
let competitionPerformance = 0;

window.robotWindow.receive = function(message, robot) {
  if (message.startsWith('percent:'))
    document.getElementById('achievement').innerHTML = metricToString(parseFloat(message.substr(8)));
  else if (message.startsWith('success:'))
    document.getElementById('achievement').style.fontWeight = 'bold';
  else
    console.log("Received unknown message for robot '" + robot + "': '" + message + "'");

  function metricToString(metric) {
    return (metric * 100).toFixed(2) + '%';
  }
};
