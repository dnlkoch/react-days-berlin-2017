/* eslint-disable no-use-before-define, no-console */
const inquirer = require('inquirer');
const { spawn } = require('child_process');
const { resolve } = require('path');

const shouldRunTests = process.argv.some(val => val === '--test');
const message = shouldRunTests
  ? 'Which test suite do you want to run?'
  : 'Which exercise do you want to run?';

// Map containing [display name, folder name]
const exercises = new Map([
  ['Exercise 1: Handling state with Mobx', 'exercise-1-mobx'],
  ['Exercise 2: Handling async data', 'exercise-1-handling-async'],
]);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'exercisePicker',
      choices: [...exercises.keys()],
      message,
    },
  ])
  .then(handleResponse)
  .catch(console.log);

function handleResponse({ exercisePicker }) {
  const dir = exercises.get(exercisePicker);
  const spawnOptions = {
    shell: true,
    stdio: 'inherit',
  };

  if (shouldRunTests) {
    spawn('jest', ['--watch', resolve(__dirname, dir)], spawnOptions);
  } else {
    spawn(
      'webpack-dev-server',
      ['--open', '--config', resolve(__dirname, `${dir}/webpack.config.js`)],
      spawnOptions,
    );
  }
}
