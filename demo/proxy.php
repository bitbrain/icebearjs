<?php
echo 'Ohmann';
if (!isset($_GET['url'])) die('No url received');
$url = urldecode($_GET['url']);
$protocol = parse_url($url);
$url = $protocol['scheme'] . '://' . str_replace($protocol['scheme'] . '://', '', $url);
echo file_get_contents($url);
?>
