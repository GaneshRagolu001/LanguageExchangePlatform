<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

require './ChatWebSocket.php';

$server = IoServer::factory(
    new HttpServer(new WsServer(new ChatWebSocket())),
    8080 // WebSocket port
);

$server->run();


 