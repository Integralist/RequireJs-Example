/**
 * jCarouselLite - jQuery plugin to navigate images/any content in a carousel style widget.
 * @requires jQuery v1.2 or above
 *
 * http://gmarwaha.com/jquery/jcarousellite/
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.0.1
 * Note: Requires jquery 1.2 or above from version 1.0.1
 */
define(['jquery'], function($){
	
	$.fn.jCarouselLite = function(o) {
			
		// Configuration Options
		o = $.extend({
			afterEnd: null,
			auto: null,
			beforeStart: null,
			btnPrev: null,
			btnNext: null,
			btnGo: null,
			circular: true,
			easing: null,
			mouseWheel: false,
			moveForward: true, // @MarkMcDonnell extended code base to allow forward & backward motion (forward by default), set to false to move backwards
			scroll: 1,
			speed: 200,
			start: 0,
			vertical: false,
			visible: 3
		}, o || {});
		
		// Returns the element collection (chainable)
		return this.each(function(){
		
			// Cache variables for quicker scope lookups
			var running = false,
				animCss = o.vertical ? "top" : "left",
				sizeCss = o.vertical ? "height" : "width",
				div = $(this),
				ul = $("ul", div),
				tLi = $("li", ul),
				tl = tLi.size(),
				v = o.visible,
				li, itemLength, curr;
				 
			if (o.circular) {
				ul.prepend(tLi.slice(tl - v - 1 + 1).clone()).append(tLi.slice(0, v).clone());
				o.start += v;
			}
			
			// These variables are defined at the top of the function but not set a value immediately
			// This is because we need to first check if the carousel is to be 'circular'
			li = $("li", ul);
			itemLength = li.size();
			curr = o.start;
			
	// div.css("visibility", "visible"); // NOT SURE WHY WE NEED THIS? THE DIV SHOULD BE VISIBLE ANYWAY!?
			
			li.css({
	            overflow: "hidden",
	     		float: o.vertical ? "none" : "left"
	     	});
	        
			ul.css({
				margin: "0",
				padding: "0",
				position: "relative",
				"list-style-type": "none",
				"z-index": "1"
			});
			
			div.css({
				overflow: "hidden",
				position: "relative",
				"z-index": "2",
				left: "0px"
			});
			
			// Full li size(incl margin)-Used for animation
			var liSize = o.vertical ? height(li) : width(li);
			
			// size of full ul(total length, not just for the visible items)
			var ulSize = liSize * itemLength;
			
			// size of entire div(total length for just the visible items)
			var divSize = liSize * v;
			
			li.css({
				overflow: "hidden",
				float: o.vertical ? "none" : "left",
				width: li.width(),
				height: li.height()
			});
			
			ul.css(sizeCss, ulSize + "px").css(animCss, -(curr * liSize));
			
			// Width of the DIV. length of visible images
			div.css(sizeCss, divSize + "px");
			
			if (o.btnPrev) {
				$(o.btnPrev).click(function() {
					o.moveForward = false;
					return go(curr - o.scroll);
				});
			}
			
			if (o.btnNext) {
				$(o.btnNext).click(function() {
					o.moveForward = true;
					return go(curr + o.scroll);
				});
			}
			
			if (o.btnGo) {
				$.each(o.btnGo, function(i, val) {
					$(val).click(function() {
						return go(o.circular ? o.visible + i : i);
					});
				});
			}
			
			if (o.mouseWheel && div.mousewheel) {
				div.mousewheel(function(e, d) {
					return d > 0 ? go(curr - o.scroll) : go(curr + o.scroll);
				});
			}
			
			if (o.auto) {
				setInterval(function() {
					// check if we need to be moving forward or backwards
					(o.moveForward) ? go(curr + o.scroll) : go(curr - o.scroll);
				}, o.auto + o.speed);
			}
			
			function vis() {
				return li.slice(curr).slice(0, v);
			}
			
			function go(to) {
			
				if (!running) {
	
					if (o.beforeStart) {
	           			o.beforeStart.call(this, vis());
					}
	
					// If circular we are in first or last, then goto the other end
					if (o.circular) {
						
						// If first, then goto last
	               		if (to <= o.start - v - 1) {
	               	
							ul.css(animCss, -((itemLength - (v * 2)) * liSize) + "px");
								
							// If "scroll" > 1, then the "to" might not be equal to the condition; it can be lesser depending on the number of elements.
							curr = to == o.start - v - 1 ? itemLength - (v * 2) - 1 : itemLength - (v * 2) - o.scroll;
								
	                  	} 
	                  
	                  	// If last, then goto first
	                  	else if (to >= itemLength - v + 1) {
								
							ul.css(animCss, -((v) * liSize) + "px");
								
							// If "scroll" > 1, then the "to" might not be equal to the condition; it can be greater depending on the number of elements.
							curr = to == itemLength - v + 1 ? v + 1 : v + o.scroll;
								
	                  	} else {
							curr = to;
	                  	}
	              
					} 
					
					// If non-circular and to points to first or last, we just return
					// If neither overrides it, the curr will still be "to" and we can proceed
					else {
						if (to < 0 || to > itemLength - v) {
							return;
						} else {
	              			curr = to;
						}
					}
	                
					running = true;
					
					ul.animate(
						(animCss == "left") ? {
							left: -(curr * liSize)
						} : {
							top: -(curr * liSize)
						}, o.speed, o.easing, function() {
							if (o.afterEnd) {
								o.afterEnd.call(this, vis());
							}
							running = false;
						}
	           		);
	
					// Disable buttons when the carousel reaches the last/first, and enable when not
					if (!o.circular) {
						$(o.btnPrev + "," + o.btnNext).removeClass("disabled");
						$((curr - o.scroll < 0 && o.btnPrev) || (curr + o.scroll > itemLength - v && o.btnNext) || []).addClass("disabled");
					}
	
				}
	     
	     		return false;
			}
			
		});
		   
	};
	
	function css(el, prop) {
			return parseInt($.css(el[0], prop)) || 0;
	}
	
	function width(el) {
			return el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
	}
	
	function height(el) {
			return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
	}
	
});