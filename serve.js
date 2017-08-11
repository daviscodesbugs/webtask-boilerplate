const request = require('request').defaults({ json: true });
const { exec } = require('child_process');
const portfinder = require('portfinder');
const secrets = require('./secrets');

portfinder.getPort((err, port) => {
	var cmd = "wt serve app.js -p " + port;
	Object.keys(secrets).forEach((key) => {
		cmd += " --secret " + key + "=" + secrets[key];
	});
	cmd += " --storage-file storage.json";

	var server = exec(cmd, (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}
	});

	server.stdout.on('data', (data) => {
		console.log(data);
	});

	server.stderr.on('data', (data) => {
		console.log(`STDERR: ${data}`);
	});

	server.on('close', (code) => {
		console.log(`Server exited with code ${code}`);
	});

	setTimeout(() => {
		request("http://127.0.0.1:" + port + "", (err, res, data) => {
			console.log("Task Response ====================\n", err, data, "\n==================================");
			process.exit();
		});
	}, 3000);
});
