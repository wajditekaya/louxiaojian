<?

// define template for gallery
$sImageTemplate = <<<HTML
<a href="{fileurl}" title="{title}"><img src="{fileurl}" /></a>
HTML;

$sImages = '';
$sFolder = 'data_images/';

$aUnits = array( // obtaining array of used images
    'pic1.jpg' => 'Image 1', 'pic2.jpg' => 'Image 2', 'pic3.jpg' => 'Image 3', 'pic4.jpg' => 'Image 4',
    'pic5.jpg' => 'Image 5', 'pic6.jpg' => 'Image 6', 'pic7.jpg' => 'Image 7', 'pic8.jpg' => 'Image 8',
    'pic9.jpg' => 'Image 9', 'pic10.jpg' => 'Image 10'
);

foreach ($aUnits as $sFileName => $sTitle) { // preparing images data
    $sImages .= strtr($sImageTemplate, array('{fileurl}' => $sFolder . $sFileName, '{title}' => $sTitle));
}

echo $sImages;

?>