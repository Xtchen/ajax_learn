// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
	$('#show').click(function(){
		$.ajax({
			type: "GET",
			url: "cats/1",
			success: function(data){
				$('html').fadeOut('slow', function(){
					$('html').empty();
					$('html').html(data);
					$('html').fadeIn('slow');
				});
			}
		});
	});

	var index=1;
	var lis=$('#sentences li');
	function rotate(){
		if(index>=lis.length){
			index=0;
		}
		$(lis).hide();
		$(lis[index]).css({'display':'inline'}).hide().fadeIn(1000);
		index++;
	};

	$(lis).first().css({'display':'inline'});

	setInterval(rotate, 3000);	
	//rotate(0, lis);
	$('#part1, #part2').css({'height':$(window).height()*1.5});
	$('#part3').css({'height':$(window).height()*0.7});
	var ht=$('#img1').height();
	var ht_trick=$('#lt-trick').height();
	$(window).scroll(function(){
		var distance=$(document).scrollTop();
		var factor=distance/3/$(window).height()+1;
		var height_1=$(window).height()*1.5*factor;
		var width_1=$(window).width()*factor;
		var dis=1.05*distance-200;

		$('#img1').css({'height':ht-distance, 'backgroundSize':width_1+'px '+height_1+'px'});
		$('#lt-trick').css({'backgroundPosition':'700px '+dis+'px'});
		$('#part1 h1,#part1 h2.show').css({'opacity':1-distance/$(window).height()});
		$('#part1 h2.hide').css({'opacity':0.2+distance/$(window).height()});
	});
	$('#part3 li').mouseenter(function(){

		$(this).find('div').stop().animate({'background-position-x':'-120px','background-position-y': '0px','margin-bottom':'-20px'},300).css({'color':'white'});
	});
	$('#part3 li').mouseleave(function(){
		$(this).find('div').stop().animate({'background-position-x':'0px','background-position-y': '-120px','margin-bottom':'0px'},300).css({'color':'#77c18d'});
	});
});