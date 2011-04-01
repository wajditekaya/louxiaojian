<?php
$type=$_GET['type'];
$time=$_GET['time'];
class delay
{
	var $time;
	function image(){
	  sleep($this->time);
	  header('Location:129123395.jpg');
	}
	function js(){
	  sleep($this->time);
	  header('Location:QIE.js');
	}
	function iframe(){
	  sleep($this->time);
	  header('Location:iframe.html');
	}
};
$newDelay=new delay();
$newDelay->time=$time;
$newDelay->$type();
?>