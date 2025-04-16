<?php
// Message.php
class Message
{
    private $con;

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function sendMessage($senderId, $receiverId, $message)
    {
        $stmt = $this->con->prepare("INSERT INTO messages (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, NOW())");
        return $stmt->execute([$senderId, $receiverId, $message]);
    }

    public function getChat($user1, $user2)
    {
        $stmt = $this->con->prepare("
        SELECT m.*, u.name AS sender_username, u.profile_picture 
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE (sender_id = ? AND receiver_id = ?) 
           OR (sender_id = ? AND receiver_id = ?)
        ORDER BY timestamp ASC
    ");

        $stmt->execute([$user1, $user2, $user2, $user1]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
