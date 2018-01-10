<?php

/*
接收文件并合并
*/

if (!file_exists('./upload/up.mp3')) {
    move_uploaded_file($_FILES['part']['tmp_name'], './upload/up.mp3');
} else {
    file_put_contents('./upload/up.mp3',file_get_contents($_FILES['part']['tmp_name']),FILE_APPEND);
}

echo 'ok';

?>