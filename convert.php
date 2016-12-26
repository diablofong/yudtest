<?php
$mp4dir = '/Users/duncan/Desktop/tmp';
$outputdir = '/Users/duncan/Desktop/tmp2';
$dirs = scandir($mp4dir);

foreach ($dirs as $file) {
	echo $file.'\n';
	$uuid = uniqid();
	exec('ffmpeg -i '.$mp4dir.'/'.$file.' '.$outputdir.'/'.$uuid.'.mp3');
}


?>