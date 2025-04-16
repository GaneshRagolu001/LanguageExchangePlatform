<?php
// ChatWebSocket.php
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

require __DIR__ . '/../vendor/autoload.php';

class ChatWebSocket implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        echo "WebSocket Server started...\n";
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection: ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg, true);

        foreach ($this->clients as $client) {
            $client->send(json_encode([
                'sender_id' => $data['sender_id'],
                'receiver_id' => $data['receiver_id'],
                'message' => $data['message'],
                'timestamp' => date('Y-m-d H:i:s')
            ]));
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} closed\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "Error: {$e->getMessage()}\n";
        $conn->close();
    }
}
