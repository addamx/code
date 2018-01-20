<?php

$cnt = file_get_contents('./res.txt');
$cnt += 1;
file_put_contents('./res.txt', $cnt);

echo 'xx';

//利用http 204

header('HTTP/1.1 204 No Content');

?>

<script>
parent.document.getElementById("regres").innerHTML="注册成功";
</script>
