"""Supervisor of the robot programming competition."""

from controller import Supervisor
import os
import sys

def competitionPerformance(message, robot):
    competition_name = message.split(':')[1]
    competition_performance_string = message.split(':')[3]
    print(competition_name + ' competition complete! Your performance was ' + competition_performance_string)

robot = Supervisor()

timestep = int(robot.getBasicTimeStep())

thymio = robot.getFromDef("PARTICIPANT")
translation = thymio.getField("translation")
CI = os.environ.get("CI")

tx = 0
while robot.step(timestep) != -1:
    t = translation.getSFVec3f()
    percent = 1 - abs(0.25 + t[0]) / 0.25
    if percent < 0:
        percent = 0
    if t[0] < -0.01 and abs(t[0] - tx) < 0.0001:  # away from starting position and not moving any more
        name = 'Robot Programming'
        performance = str(percent)
        performanceString = str(round(percent * 100, 2)) + '%'
        message = 'success:' + name + ':' + performance + ':' + performanceString
        robot.wwiSendText(message)
        if CI:
            print(f'performance:{performance}')
        else:
            print(f'Evaluation complete! Your performance is {performanceString}')
    else:
        message = "percent"
    message += ":" + str(percent)
    robot.wwiSendText(message)
    if message[0] == 's':  # success
        break
    tx = t[0]

robot.simulationSetMode(Supervisor.SIMULATION_MODE_PAUSE)
