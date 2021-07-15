spawn = require('child_process').spawn
autorotate = require('./gettoken')

const runGetPid = (cmd, args, path) => {
  const process = spawn ( cmd , args , { cwd : path } );
  return process;
}

var args = process.argv.slice(2);

const main = (callback, oldproc) => {
  console.log('opening new bot process')
  proc = runGetPid('node',[args])
  proc.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });
  
  proc.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });
  setTimeout(() => {
    oldproc.kill('SIGINT');
  }, 8000);

  console.log('killed old bot process')
  callback(proc)
}


const wait = (proc) => {
  setTimeout(() => {
      main(wait,proc)
  }, 30000);
}

main(wait,runGetPid('node',['bot.js']))