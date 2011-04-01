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
};
$newDelay=new delay();
$newDelay->time=$time;
$newDelay->$type();
?>