module.exports = function(ctx, taskDone) {
	taskDone(null, {
		hello: ctx.data.name || 'Chicken'
	});
};
