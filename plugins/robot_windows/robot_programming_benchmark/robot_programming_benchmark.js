import RobotWindow from 'https://cyberbotics.com/wwi/R2022b/RobotWindow.js';
import Benchmark from 'https://cyberbotics.com/wwi/testingR2022b/Benchmark.js';
/* global sendBenchmarkRecord, showBenchmarkRecord, showBenchmarkError */

window.robotWindow = new RobotWindow();
const benchmarkName = 'Robot Programming';
let benchmarkPerformance = 0;

window.robotWindow.receive = function(message, robot) {
  if (message.startsWith('percent:'))
    document.getElementById('achievement').innerHTML = metricToString(parseFloat(message.substr(8)));
  else if (message.startsWith('success:')) {
    benchmarkPerformance = message.split(':')[2]
    const benchmarkPerformanceString = metricToString(benchmarkPerformance);
    document.getElementById('achievement').innerHTML = benchmarkPerformanceString;
    document.getElementById('achievement').style.color = 'green';
    showBenchmarkPerformance(this, benchmarkName, benchmarkPerformance, benchmarkPerformanceString);
  } else
    console.log("Received unknown message for robot '" + robot + "': '" + message + "'");

  function metricToString(metric) {
    return (metric * 100).toFixed(2) + '%';
  }
};

function showBenchmarkPerformance(robotWindow, benchmarkName, benchmarkPerformance, benchmarkPerformanceString) {
  robotWindow.send('success:' + benchmarkName + ':' + benchmarkPerformance + ':' + benchmarkPerformanceString);
  /* console.log('Testing...');
  document.getElementById('connect-button').style.color('violet');
  console.log('Creating Benchmark instance.');
  const benchmark = new Benchmark();
  benchmark.printMessage('Test message.');
  benchmark.printParentUrl(); */
  return true;
}
