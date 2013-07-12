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
});
function loadXMLDoc()
{
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("showContent").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","cats/1",true);
xmlhttp.send();
}