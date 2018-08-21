const childProcess = require('child_process');
const path = require('path');

const RSCRIPT = 'Rscript';

function call(script, args) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(script);
    const result = args
      ? childProcess.spawn(RSCRIPT, [scriptPath, JSON.stringify(args)])
      : childProcess.spawn(RSCRIPT, [scriptPath]);

    const ret = {
      stdout: '',
      stderr: '',
    };
    result.stdout.on('data', (output) => {
      ret.stdout += output.toString();
    });
    result.stderr.on('data', (error) => {
      ret.stderr += error.toString();
    });
    result.on('close', (signal) => {
      if (signal === 0) {
        try {
          const json = JSON.parse(ret.stdout);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      } else if (signal === 1) {
        reject(new Error(ret.stderr));
      } else {
        const errorMessage = `Exit code: ${signal}\nOutput:\n${ret.stdout}\n\nError:\n${ret.stderr}`;
        reject(new Error(errorMessage));
      }
    });
  });
}

function callSync(script, args) {
  const scriptPath = path.resolve(script);
  const result = args
    ? childProcess.spawnSync(RSCRIPT, [scriptPath, JSON.stringify(args)])
    : childProcess.spawnSync(RSCRIPT, [scriptPath]);

  if (result.status === 0) {
    try {
      return JSON.parse(result.stdout.toString().trim());
    } catch (err) {
      return err.message;
    }
  } else if (result.status === 1) {
    return result.stderr.toString();
  } else {
    return `Exit code: ${result.status}\nOutput:\n${result.stdout.toString()}\n\nError:\n${result.stderr.toString()}`;
  }
}

module.exports.callSync = callSync;
module.exports.call = call;
