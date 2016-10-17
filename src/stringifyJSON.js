// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
	//final return value
	var result = [];

	var elemType = {
			'null_boolean': function(obj) {
				return '' + obj + '';
			},
			'array': function(obj) {
				if (obj.length === 0) {
					result.push("[]");
				}
				var arr = [];

				for (var i = 0, length = obj.length; i < length; i++) {
					//return {} for fn and undefined values
					if (typeof obj[i] === 'function' || obj[i] === undefined) {
						results.push('{}');
					}
					//recursive call if nested
					if (typeof obj[i] === 'object') {
						arr.push(stringifyJSON(obj[i]));
					} else {
						arr.push(checkString(obj[i]));
					}
				}
				result.push("[" + arr.join(',') + "]");
			},
			'object': function(obj) {
				if (Object.keys(obj).length < 1) {
					result.push("{}");
				}
				var arr = [];
				for (var key in obj) {
					//return {} for fn and undefined values
					if (typeof obj[key] === 'function' || obj[key] === undefined) {
						result.push("{}");
					}
					//recursive call if nested
					if (typeof obj[key] === 'object') {
						arr.push(checkString(key) + ":" + stringifyJSON(obj[key]));
					} else {
						arr.push(checkString(key) + ":" + checkString(obj[key]));
					}
				}
				result.push("{" + arr.join(',') + "}");
			}
		} //end of obj map

	//add quotes to strings and leave numbers alone
	function checkString(elem) {
		if (typeof elem === 'string') {
			return '"' + elem + '"';
		} else {
			return elem;
		}
	}
	//check for types
	if (typeof obj === 'function' || obj === undefined) {
		return {};
	}
	if (obj === null || typeof obj === 'boolean') {
		result.push(elemType['null_boolean'](obj));
	} else if (typeof obj === 'number') {
		return obj.toString();
	} else if (typeof obj === 'string') {
		return '"' + obj + '"';
	} else if (obj.constructor === Array) {
		elemType['array'](obj);
	} else {
		elemType['object'](obj);
	}
	return result[0];
}