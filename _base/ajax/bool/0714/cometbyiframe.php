<?php
/****
自学it网 高端PHP培训

论  坛: http://www.zixue.it
微  博: http://weibo.com/Yshiba
 ****/

/*

comet 反向ajax,
又叫服务器推技术, server push
在"实时聊天","消息推送"中,比较适宜用这种技术.

服务器端:
1:不要断开连接
2:有消息时再发送

原理: HTTP/1.1 的长连接与chunk传输.
chunk有切割分块的意思.
就是说----服务器端也不知道到底要传输多少length给浏览器,
只能每次传1小块 chunk.

具体做法:
php用一个死循环,始终运行
有相关消息时,立即把内容推到浏览器上
 */
echo 'ddddxxxxxxxxxxxxxxx';
set_time_limit(0);
ob_start();

echo str_repeat(' ', 4000), '<br />'; //webserver可能要收到足够多的内容才会推给浏览器
ob_flush();
flush();

require './conn.php';

while (true) {
    //死循环

    $sql = 'select * from msg where rec = "admin" and isread=0';
    $rs  = mysql_query($sql, $conn);

    $msg = mysql_fetch_assoc($rs);
    if (!empty($msg)) {
        // 把msg设为已读状态
        $sql = 'update msg set isread=1 where mid=' . $msg['mid'] . ' limit 1'; //由于有sleep(1)所以需要加"limit 1"避免1秒内有连续输入
        mysql_query($sql, $conn);

        $msg = json_encode($msg);
        echo '<script type="text/javascript">';
        echo 'parent.window.comet(', $msg, ');'; //让iframe接受这个js代码,
        echo '</script>'; //这段js让父页面的comet函数接收$msg消息并运行
        ob_flush(); // 强迫php把内容发给apache
        flush(); // 强迫webserver把内容发送到浏览器

    }
    sleep(1); //必须有sleep否则服务器负担太大
}