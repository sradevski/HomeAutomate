const PythonShell = require('python-shell');

function executePythonScript(scriptFolder, scriptName, argArray, callback){
  var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'],
    scriptPath: scriptFolder,
    args: argArray.map(val => val.toString())
  };

  PythonShell.run(scriptName, options, function (err, results) {
    if (err){
	//throw err;
    }

    callback();
  });
}

exports.executePythonScript = executePythonScript;
