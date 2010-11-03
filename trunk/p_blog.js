
jQuery(function($){
	var new_entry = $('#new_entry');
	new_entry.live('keydown keyup click',function(e){
		Entry.fansTip(e,$(this));
	}).live('blur',function(){
		Entry.setCookie('cash_input',$(this).val().trim());
	}).keyup();
});