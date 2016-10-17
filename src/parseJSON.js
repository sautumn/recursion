// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
var _ = require('underscore');
// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	// your code goes here
	var result;
	var tokensArray = json.split(''); //tokenarr

	var tokenNum = tokensArray.length; //tokennumbers
	var i = 0;

	while (tokenNum > 0) {
		if (tokensArray[i] === '[') {
			result = [];
			tokensArray.shift(); //remove the first element
			tokenNum--; //decrement the tokenNum(length)

			var re = /\[(.*?)\]$/; //get everything between []
			var reItems = re.exec(json);
			if (reItems[1] === '') { //if the array is empty
				return result; //return an empty array 
			}

			var items = reItems[1].split(','); //remove " and ' and whitespace

			var newitems = reItems[1].split('');

			var stack = [];
			var elemBuilder = []
			var elems = [];
			newitems.push(',');
			for (var i = 0, length = newitems.length; i < length; i++) {
				if ((/{|\[|"/g).test(newitems[i]) === true) {
					elemBuilder.push(newitems[i]);
					stack.push(newitems[i]);
				} else if ((/}|\]|"/g).test(newitems[i]) === true) {
					elemBuilder.push(newitems[i]);
					stack.pop(newitems[i]);
				}
				else if (newitems[i]===","){
					elems.push(elemBuilder.join(''));
					elemBuilder = [];
				}
				else{
					elemBuilder.push(newitems[i]);
				}
			}
			for (var i = 0, length = items.length; i < length; i++) {
				result.push(checkTypes(items[i]));

			}
			json = json.replace(re, ''); //remove selected items from string
			tokenNum = json.length; //update length
		}
		if (tokensArray[i] === '{') {
			result = {}; //change result to an obj
			tokensArray.shift(); //remove the first element
			tokenNum--; //decrement the tokenNum(length)

			var re = /\{(.*?)\}$/; //get everything between {}
			var reItems = re.exec(json);

			//do something if the obj format is wrong
			if (reItems === null) {
				//throw error if brackets are incorrect
				console.log("Broken");
				return;
			}
			if (reItems[1] === '') { //if the obj is empty
				return {}; //return an empty obj
			}

			//capture object format w/o split
			var testRe = /"(.*?)":(\[.*\]|.*?)(?:,|$)/g;
			var test;

			while ((test = testRe.exec(reItems[1])) !== null) {
				//if the the test2 has []
				result[test[1]] = checkTypes(test[2]);

			}
			json = json.replace(re, ''); //remove selected items from string
			tokenNum = json.length; //update length
		}
	}

	function checkTypes(elem) {
		//if [] or {}, recursive call
		
		if ((/^\{.*\}$|^\[.*?\]$/g).test(elem) === true){
			result = parseJSON(elem);
		}
		//checks for primitive types or numbers
		//clean up the spaces in the primitive strings/ints/ect
		//console.log(elem);
		elem = elem.replace(/\s|,|/g, "");
		var primitives = {
			"true": true,
			"false": false,
			"null": null
		};
		var result;
		for (var key in primitives) {
			if (key === elem) {
				result = primitives[key];
			}
		}
		//if not a primitive, number or float or string
		if (result === undefined) {
			if ((/\./).test(elem) === true) {
				//if it elem contains decimals, parseFloat
				result = parseFloat(elem);
			} else if ((/"/).test(elem) === true) {
				//if it has quotes, its a string
				//remove and set to result
				result = elem.replace(/"/g, '');
			} else {
				//otherwise parseInt
				result = parseInt(elem);
			}
		}
		return result;
	}

	function error() {
		throw new Error('SyntaxError: Unexpected end of JSON input');
	}
	//console.log(result);
	return result;
};

//Individual test cases for parseJSON

// parseableStrings = [
//  //basic stuff
//   '[]',
//   '{"foo": ""}',
//   '{}',
//  '{"foo": "bar"}',
//   '[false, true, null, "test", 5]',
//   '{"a": "b", "c": "d"}',
//  '[null,false,true]',
//   '{"foo": true, "bar": false, "baz": null}',
//   '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
//   '{}',
//   '{"boolean, true": true, "boolean, false": false, "null": null }',
//   '{"a":{"b":"c"}, "test":2}',
//   '{"a":{"b":"c"}}',
//   '{"a":["b", "c"]}',
//   '[{"a":"b"}, {"c":"d"}, {"test":"this"}]',
//   '{"a":[],"c": {}, "b": true}',
//   '[[[["foo"]]]]'
//   ];

//   for (var i = 0, length = parseableStrings.length; i < length; i++) {
//   	console.log(i + ': Expected ' + JSON.parse(parseableStrings[i]) + " to equal " + parseJSON(parseableStrings[i]) + " : " + typeof parseJSON(parseableStrings[i]));
//   	console.log(_.isEqual(JSON.parse(parseableStrings[i]),parseJSON(parseableStrings[i])));
//   } 

 