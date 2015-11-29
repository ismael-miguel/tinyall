(function(window, undefined) {
	var funcs = {
		//echo
		'_':function(value, data){
			var tmp = data.out + (value === undefined ? data.last : value);
			data.vars[';'] = data.out = tmp;
			return tmp;
		},
		//array
		A:function(value, data){
			var split_value = (value || '').split(/(\-?\d+(?:\.\d*)?(?:[eE][\-+]?\d+)?|'(?:\\'|[^']*)*'),?/);
			var final_value = [];
			for(var i = 0, l = split_value.length; i<l; i++)
			{
				if(split_value[i][0] == '\'')
				{
					final_value[final_value.length] = split_value[i].replace(/^'(.*)'$/,'$1').replace(/\\'/g,'\'');
				}
				else if(split_value[i]/1 || split_value[i] == '0')
				{
					final_value[final_value.length] = +split_value[i];
				}
			}
			
			return final_value;
		},
		//comparison functions
		C:function(value, data){
			
		},
		D:function(value, data){
			
			var debug = {
				value: value,
				type: typeof value,
				memory: data
			}
			
			if(console && console.log)
			{
				console.log(debug);
			}
			
			return value;
		},
		//eval
		E:function(value, data){
			run_code(value, data);
		},
		//flip the value around
		F:function(value, data){
			if(('object' === typeof value) && value.reverse)
			{
				return value.reverse();
			}
			else
			{
				return value.toString().split('').reverse().join('');
			}
		},
		//hello worlds
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
		//math functions
		M:function(value, data){
			
		},
		//not (inverts values/casing)
		N:function(value) {
			switch(typeof value)
			{
				case 'boolean':
					return !value;
				case 'number':
					return -value;
				case 'string':
					var tmp = '';
					for(var i = 0, l = value.length; i < l; i++)
					{
						if(value[i] >= 'a' && value[i] <= 'z')
						{
							tmp += String.fromCharCode(value.charCodeAt(i) - 32);
						}
						else if(value[i] >= 'A' && value[i] <= 'Z')
						{
							tmp += String.fromCharCode(value.charCodeAt(i) + 32);
						}
						else
						{
							tmp += value[i];
						}
					}
					return tmp;
				default:
					return 0;
			}
		},
		//passthrough
		P:function(value) {
			return value;
		},
		//repeat
		R:function(value, data){
			var tmp = '';
			
			if(value > 0)
			{
				while(value--)
				{
					tmp += data.last;
				}
			}
			
			return tmp;
		},
		//string functions
		S:function(value, data){
			var methods = {
				t:function(value){
					return value.replace(/^\s+/,'').replace(/\s+$/,'');
				},
				u:function(value){
					return value.toUpperCase();
				},
				T:function(value ){
					
				},
				R:function(value){
					
				}
			};
			
			var tmp = data.last.toString();
			for(var i = 0, l = value.length; i < l; i++)
			{
				tmp = value[i] in methods ? methods[value[i]](tmp, value, i) : '';
			}
		
			return tmp;
		},
		//clears output
		Z:function(value, data) {
			return data.vars[';'] = data.out = 0;
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
					return get_value(value, data, true);
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
		
		if(/^\-?\d+(?:\.\d*)?(?:[eE][\-+]?\d+)?$/.test(x))
		{
			//returns a number
			return +x;
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
	
	var run_code = function(code, memory){
		
		if(!code || /^[a-z\d]$/.test(code))
		{
			memory.out = funcs.H(get_value(code, memory));
		}
		else
		{
			code.toString().replace(
				// /(?:([^A-Z_:'"])=)?([A-Z_])(?::('.|"[^"]*"|-?\d+|.))?/g,
				/(?:([^A-Z_'"])=)?([A-Z_])(?:('.|"[^"]*"|-?\d+|[^A-Z_'"]))?/g,
				function(_, name, func, value){
					
					memory.vars[name || ':'] = memory.last = (funcs[func] || noop)( value ? get_value(value, memory) : memory.last, memory);
					
					return '';
				}
			);
		}
	}
	
	var noop = function(){};
	
	window.tinyAll=function(code, input) {
		var data = {
			out: '',
			last: 0,
			input: input || 0,
			vars: {
				//version
				'|':'0.3',
				//input
				':':input || 0,
				//output
				';':0,
				//code
				'.':(code || '').toString()
			}
		};
		
		run_code(data.vars['.'], data);
		
		return data.out || 0;
	};
})(Function('return this')());
