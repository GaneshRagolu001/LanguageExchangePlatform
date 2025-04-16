<?php
// MessageController.php
require_once __DIR__ . '/../models/Message.php';

class MessageController
{
    private $messageModel;

    public function __construct($pdo)
    {
        $this->messageModel = new Message($pdo);
    }

    public function send($senderId, $receiverId, $message)
    {
        return $this->messageModel->sendMessage($senderId, $receiverId, $message);
    }

    public function fetchChat($user1, $user2)
    {
        return $this->messageModel->getChat($user1, $user2); // corrected typo from getChart
    }
}
