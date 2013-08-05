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

//snake object
function Snake(){
	this.dead=false;
    this.direction= 2;
    this.speed= 1;
    this.body=init_body();
    this.speed=700;

    //initialize the snake
    this.init =function(arr){
    	for(var i=0;i<arr.length;i++){
    		$("#"+arr[i]).addClass("snake_body");
    	}
    }
    
    //move one step based on the current direction
    function one_step(arr, dir, snake){
    	var head=arr[0];
    	var x=parseInt(head.split("_")[0]);
    	var y=parseInt(head.split("_")[1]);
    	var new_head="";
    	//get the position of the new head
    	switch(dir){
	   		case 4:
	   			new_head=x+"_"+(y-1);
	    		break;
	    	case 2:
	   			new_head=x+"_"+(y+1);
				break;
	    	case 1:
	   			new_head=(x-1)+"_"+y;
	    		break;
	    	case 3:
	   			new_head=(x+1)+"_"+y;
	    		break;
		};

		//check
		var status=check(new_head);
		if(status<0){
			snake.dead=true;
			return false;
		}
		else if(status==1){
			//recalculate the speed and generate new food
			speed(snake);
			create_food(snake);
		}
    	//add a new head
		arr.splice(0,0,new_head);
		$('#'+new_head).addClass("snake_body");
		$('#'+new_head).removeClass("food");


		//remove the tail if this is not food
		if(status!=1){
	    	var tail=arr.pop();
			$('#'+tail).removeClass("snake_body");
		}

			update_length('#len',snake);
    		update_speed('#speed',snake);
		return true;
    };

    //check the status
    //wall -2
    //body -1
    //food 1
    //nromal 0
    //otherwise 5
    function check(head){
    	var x=head.split("_")[0];
    	var y=head.split("_")[1];
    	if(x<0 || y<0 || x>=50 || y>=50){
    		return -2;
    	}
    	var classes=$('#'+head).attr("class");
    	if(classes=="cell"){
    		return 0;
    	}
    	else if(classes=="cell snake_body"){
    		return -1;
    	}
    	else if(classes=="cell food"){
    		return 1;
    	}
    	else{
    		return 5;
    	}
    }

    //keep moving!
    this.move=function(arr, dir, snake){
    	one_step(arr, dir, snake);
    	return setInterval(function(){
    		one_step(arr, dir, snake)
    	}, snake.speed);
    };
};

//create the table for the snake
function create_table(container){
	var tb=$('<table class="board_table"></table>');
	var tr='<tr></tr>';
	var td='<td></td>';
	for(var i=0;i<50;i++){
		var new_tr=$(tr);
		for(var j=0;j<50;j++){
			new_tr.append($(td).attr({'id': i+'_'+j, 'class':'cell'}));
		}
		tb.append($(new_tr));
	}
	$(container).append($(tb));
}

//init body
function init_body(){
	var body=new Array();
    body[0]="25_21";
    body[1]="25_20";
    body[2]="25_19";
    body[3]="25_18";
    body[4]="25_17";
    body[5]="25_16";
    return body;
}

//generate food; should avoid the body of the snake
function create_food(snake){
	var num=Math.floor(Math.random()*(2500-snake.body.length));
	for(var i=0;i<50;i++){
		for(var j=0;j<50;j++){
			var c=$('#'+i+'_'+j);
			if(c.attr("class")=="cell"){
				if(--num==0){
					c.addClass("food");
				}
			}
		}
	}
}

//speed
function speed(snake){
	var length=snake.body.length;
	if(length<30){
		 snake.speed=700-length/10*100;
	}
	else if(length<100){
		snake.speed=600-length/10*50;
	}
	else if(length<900){
		snake.speed=110-length/100*10;
	}
	else{
		snake.speed=20;
	}
}

//handle the keydown event
function key_handler(snake,key,inter){
	if(snake.dead)return false;
	switch(parseInt(key.which,10)) {
		case 65:
			if(snake.direction!=2)
			snake.direction=4;
			break;
		case 83:
			if(snake.direction!=1)
			snake.direction=3;
			break;
		case 87:
			if(snake.direction!=3)
			snake.direction=1;
			break;
		case 68:
			if(snake.direction!=4)
			snake.direction=2;
			break;
		default:
			break;
	};
	clearInterval(inter);
    return snake.move(snake.body, snake.direction, snake);
}

//update the value of length
function update_length(span, snake){
	$(span).text(snake.body.length);
}

//update the value of speed
function update_speed(span, snake){
	$(span).text(700-snake.speed);
}

$(document).ready(function() {
    var snake=new Snake();
    var main=$('#board');
    var inter=0;
    //create the table
    create_table(main);
    //initialize the snake
    snake.init(snake.body);
    //create food
    create_food(snake);
    //display the speed and length
    update_length('#len',snake);
    update_speed('#speed',snake);
    //listener for the keydown event
    $(document).keydown(function(key){
        inter=key_handler(snake,key,inter);
    });
});



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
	$('#part3').css({'height':$(window).height()*0.8});
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

		if(distance==$(document).height()-$(window).height()){
			$('#bottom-intro').fadeIn(2000);
		}
	});
	$('#part3 li').mouseenter(function(){
		$(this).find('div').stop().animate({'background-position-x':'-120px','background-position-y': '0px','margin-bottom':'-20px'},500).css({'color':'#FFFFFF'});
	});
	$('#part3 li').mouseleave(function(){
		$(this).find('div').stop().animate({'background-position-x':'0px','background-position-y': '-120px','margin-bottom':'0px'},500).css({'color':'#77c18d'});
	});
});