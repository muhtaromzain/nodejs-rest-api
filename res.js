'use-strict';

exports.ok = function(values, res) {
	var data = {
		'status': 200,
		'values': values
	};
	
	res.json(data);
	res.end();
};

// Response for nested json
exports.nested = function (values, res) {
	// accumulation
	const result = values.reduce((accumulation, item) => {
		// choose the key group
		if(accumulation[item.name]){
			// variable to group students name
			const group = accumulation[item.name];
			// check whether array consist of subject
			if(Array.isArray(group.subject)) {
				group.subject.push(item.subject);
			}
			else {
				group.subject = [group.subject, item.subject];
			}
		}
		else {
			accumulation[item.name] = item;
		}
		return accumulation;
	}, {});
	
	var data = {
		'status': 200,
		'value': result
	};
	
	res.json(data);
	res.end();
};