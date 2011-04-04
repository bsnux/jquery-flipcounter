/**
 * Simple Flip Counter
 * -------------------
 *  
 * This pluing creates a simple flip counter. It value should be changed
 * using the "setValue()" public method
 *
 * Based on:
 *
 * Copyright (c) 2010 Chris Nanney
 * http://cnanney.com/journal/code/apple-style-counter-revisited/
 * http://cnanney.com/journal/code/apple-style-counter/
 * 
 * Modify by: Arturo Fernandez
 * 
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 */
 
var flipCounter = function(d, options){

	var defaults = {
		value: 0
	};
	
	var o = options || {},
	div = d && d != '' ? "#" + d : "#counter";
	
	for (var opt in defaults) o[opt] = (opt in o) ? o[opt] : defaults[opt];

	var tFrameHeight = 39,
	bFrameHeight = 64,
	frameWidth = 53,
	digitsOld = [], digitsNew = [], subStart, subEnd, x, y;

    /* Public method */	
	this.setValue = function(n){
		x = o.value.toString();
		y = n.toString();
		o.value = n;
		digitCheck(x,y);

		return this;
	};
	
	
	function digitCheck(x,y){
		digitsOld = splitToArray(x);
		digitsNew = splitToArray(y);
		if (y.length > x.length){
			var diff = y.length - x.length;
			while (diff > 0){
				var adder = 1;
				addDigit(y.length - diff + 1, digitsNew[y.length - diff]);
				adder++;
				diff--;
			}
		}
		if (y.length < x.length){
			var diff = x.length - y.length;
			while (diff > 0){
				var adder = 1;
				removeDigit(x.length - diff);
				diff--;
			}
		}
		for (var i = 0; i < digitsOld.length; i++){
			if (digitsNew[i] != digitsOld[i]){
				animateDigit(i, digitsOld[i], digitsNew[i]);
			}
		}
	}
	
	function animateDigit(n, oldDigit, newDigit){
        var pace = 800;
		var speed, step = 0, w,
        bp = [
            '-' + frameWidth + 'px -' + (oldDigit * tFrameHeight) + 'px',
            (frameWidth * -2) + 'px -' + (oldDigit * tFrameHeight) + 'px',
            '0 -' + (newDigit * tFrameHeight) + 'px',
            '-' + frameWidth + 'px -' + (oldDigit * bFrameHeight) + 'px',
            (frameWidth * -2) + 'px -' + (newDigit * bFrameHeight) + 'px',
            (frameWidth * -3) + 'px -' + (newDigit * bFrameHeight) + 'px',
            '0 -' + (newDigit * bFrameHeight) + 'px'
        ];

        switch (n){
            case 0:
                speed = pace/6;
                break;
            case 1:
                speed = pace/5;
                break;
            case 2:
                speed = pace/4;
                break;
            case 3:
                speed = pace/3;
                break;
            default:
                speed = pace/2;
                break;
        }

		speed = (speed > 80) ? 80 : speed;
		
		function animate(){
			if (step < 7){
				w = step < 3 ? 't' : 'b';
				jQuery(div + " #d" + n + " li." + w).css("background-position", bp[step]);
				step++;
				if (step != 3) setTimeout(animate, speed);
				else animate();
			}
		}
		
		animate();
	}
	
	function splitToArray(input){
		var digits = new Array();
		for (var i = 0; i < input.length; i++){
			subStart = input.length - (i + 1);
			subEnd = input.length - i;
			digits[i] = input.substring(subStart, subEnd);
		}
		return digits;
	}


	function addDigit(len, digit){
		var li = Number(len) - 1;
		if (li % 3 == 0) jQuery(div).prepend('<ul class="cd"><li class="s"></li></ul>');
		jQuery(div).prepend('<ul class="cd" id="d' + li + '"><li class="t"></li><li class="b"></li></ul>');
		jQuery(div + " #d" + li + " li.t").css({'background-position': '0 -' + (digit * tFrameHeight) + 'px'});
		jQuery(div + " #d" + li + " li.b").css({'background-position': '0 -' + (digit * bFrameHeight) + 'px'});
	}
	
	function removeDigit(id){
		jQuery(div + " #d" + id).remove();
		// Check for leading comma
		var first = jQuery(div + " li").first();
		if (first.hasClass("s")) first.parent("ul").remove();
	}

	function initialDigitCheck(initial){
		var count = initial.toString().length;
		var bit = 1;
		for (var i = 0; i < count; i++){
			jQuery(div).prepend('<ul class="cd" id="d' + i + '"><li class="t"></li><li class="b"></li></ul>');
			if (bit != (count) && bit % 3 == 0) jQuery(div).prepend('<ul class="cd"><li class="s"></li></ul>');
			bit++;
		}
		var digits = splitToArray(initial.toString());
		for (var i = 0; i < count; i++){
			jQuery(div + " #d" + i + " li.t").css({'background-position': '0 -' + (digits[i] * tFrameHeight) + 'px'});
			jQuery(div + " #d" + i + " li.b").css({'background-position': '0 -' + (digits[i] * bFrameHeight) + 'px'});
		}
		
	}
			
	initialDigitCheck(o.value);
};