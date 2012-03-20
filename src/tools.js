/*
 * The jarsmith utility belt
 */


exports = {
	// grab 3rd party minilibs
	extend: require('./extend'),
	define: require('./flow').define,
	exec: require('./flow').exec,
	serialForEach: require('./flow').serialForEach,
	
	// an array of anything, and a compare function.
	// compare a to b.
	// returns -1 if b is smaller than a
	// returns 0 if b equal to a
	// returns 1 if b is bigger than a
	// not tested
	sortLater: function(ar, compare, callback) {
		setTimeout(function() {
			if (ar.length < 2) {
				callback (ar);
				return;
			}
			var mid = Math.floor(ar.length/2),
				left = ar.slice(0, mid),
				right = ar.slice(mid, ar.length),
				sleft = sright = retar = null;
			
			exports.exec(
				function() {
					exports.sortLater(left, compare, this.MULTI());
					exports.sortLater(right, compare, this.MULTI());
				},
				function(rets) {
					sleft = rets[0][0];
					sright = rets[1][0];
					// merge those fuckers
					
					if ((sleft.length + sright.length < 3) || (compare(sleft[sleft.length-1], sright[0]) < 1)) {
						retar = sleft.concat(sright);
						sleft = [];
						sright = [];
					}
					while (sleft.length + sright.length > 0) {
						if (sleft.length == 0) {
							retar = retar.concat(sright);
							sright = [];
							break;
						}
						if (sright.length == 0) {
							retar = sleft.concat(retar);
							sleft = [];
							break;
						}
						
						switch (compare(sleft[sleft.length-1], sright[0])) {
							case -1:
								// l < r
								retar.push(sleft.splice(0, 1));
								break;
							case 0:
								// l == r
								retar.push(sleft.splice(0, 1));
								retar.push(sright.splice(0, 1));
								break;
							case 1:
								// l > r
								retar.push(sright.splice(0, 1));
								break;
						}
					}
					// done!
					callback(retar);
				}
			);
		},0);
	}
};
