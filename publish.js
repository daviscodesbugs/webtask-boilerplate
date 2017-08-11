const inquirer = require('inquirer');
const exec = require('child_process').exec;

exec("wt ls --limit 0 -o json", (err, stdout, stderr) => {
	if (err) {
		console.log("ERR: Couldn't fetch list webtasks.");
		return;
	}

	let webtasks = JSON.parse(stdout);
	let tasknames = webtasks.map((task) => { return task.name; });
	console.log(tasknames.join("\n"));

	let questions = [
		{
			type: 'input',
			name: 'task',
			message: 'Which task should be updated?'
		}
	];
	inquirer.prompt(questions).then((answers) => {
		if (tasknames.indexOf(answers.task) > -1) {
			exec("wt update " + answers.task + " app.js", (err, stdout, stderr) => {
				if (err) throw err;
				console.log(stdout);
			});
		} else {
			console.log("'" + answers.task + "' is not a valid webtask name");
		}
	});
});
