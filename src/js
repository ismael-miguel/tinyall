(function(window, undefined) {
	var funcs = {
		H:function(value) {
			return 'hH'[value&1]
				+'ello'
				+(value&2?',':'')
				+' '
				+('wW'[+!!(value&4)])
				+'orld'
				+(value&8?'!':'')
				+(value&16?'\n':'');
		},
		I:function(value, data){
			return data.input;
		},
		'_':function(value, data){
			var tmp = data.out + (value === undefined ? data.last : value);
			data.vars[';'] = data.out = tmp;
			return tmp;
		},
		V:function(value){
			return get_value(value);
		},
		P:function(value){
			return value;
		}
	};
	
	var expand_string = function(value, data){
		
		return value.replace(
			/\[:(?:([A-Z_])(.)?|([^A-Z_'"]))\]/g,
			function(_, func, arg, value){
				if(func)
				{
					return funcs[func](get_value(arg, data, true), data);
				}
				else
				{
					return get_value(value, data, true)
				}
			}
		);
		
	};
	
	var get_value = function(value, data, recursion) {
		
		if(value === null || value === undefined || value === ' ')
		{
			return undefined;
		}
		
		var x = (value || '').toString();
		
		if(/^\-?\d+$/.test(x))
		{
			//returns a number
			return Function('return ' + x)();
		}
		else if(/^[a-z]$/.test(x))
		{
			//returns a number between 10-43
			return (x in data.vars) ? data.vars[x] : x.charCodeAt(0) - 87;
		}
		else if(x[0] == '\'')
		{
			return x[1];
		}
		else if(x[0] == '"' && x.length >= 2)
		{
			var sub = x.substr(1, x.length - 2);
			
			return recursion ? sub : expand_string(sub, data);
		}
		else
		{
			return data.vars[x];
		}
	};
	
	var noop = function(){};
	
	window.tinyAll=function(code, input) {
		var data = {
			out: '',
			last: 0,
			input: input || 0,
			vars: {
				'|':'0.3',
				':':input || 0,
				';':0
			}
		};
		
		if(!code || /^[a-z\d]$/.test(code))
		{
			return funcs.H(get_value(code, {}));
		}
		
		code.toString().replace(
			// /(?:([^A-Z_:'"])=)?([A-Z_])(?::('.|"[^"]*"|-?\d+|.))?/g,
			/(?:([^A-Z_'"])=)?([A-Z_])(?:('.|"[^"]*"|-?\d+|[^A-Z_'"]))?/g,
			function(_, name, func, value){
				
				data.vars[name || ':'] = data.last = (funcs[func] || noop)( value ? get_value(value, data) : data.last, data);
				
				return '';
			}
		);
		
		return data.out || 0;
	};
})(Function('return this')());
