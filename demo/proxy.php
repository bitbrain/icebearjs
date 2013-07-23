<?php
// File Name: proxy.php
if (!isset($_GET['url'])) die();
$url = urldecode($_GET['url']);
$protocol = parse_url($url)['scheme'];
$url = $protocol . '://' . str_replace($protocol . '://', '', $url); // Avoid accessing the file system
echo file_get_contents($url);
?>
