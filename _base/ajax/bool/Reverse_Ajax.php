<?php
/*
comet 反向ajax，又叫服务器推技术，server push
在“实时聊天”，“消息推送”中，比较适合这种技术。

服务器端：
1：不要断开推送
2：有消息时在发送

原理：HTTP/1.1 的长连接与chunk传输
chunk有切割分块的意思
就是说服务器端也不知道要传输多少length给浏览器，
只能每次传一小块chunk

具体做法：
php用一个死循环，始终运行
有相关消息时，立即把内容推到浏览器上
*/

/*
基本模型
set_time_limit(0);  //不受超时时间限制
ob_start();

echo str_repeat(' ', 4000), '<br/>';    //有些浏览器当内容太少时不会立即显示
ob_flush();
flush();

$i = 0;
while(true) {
    echo $i++, '<br/>';
    ob_flush(); //强迫让php把内容给webserver
    flush(); //强迫webserver把内容发给浏览器
    sleep(1);
}
*/

$conn = mysql_connect('localhost', 'root', 'net691029');

set_time_limit(0);  //不受超时时间限制
ob_start();

echo str_repeat(' ', 4000), '<br/>';    //有些浏览器当内容太少时不会立即显示
ob_flush();
flush();

$i = 0;
while(true) {
    echo $i++, '<br/>';
    ob_flush(); //强迫让php把内容给webserver
    flush(); //强迫webserver把内容发给浏览器
    sleep(1);
}





?>