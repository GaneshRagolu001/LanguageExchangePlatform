<?php

class Language
{
    private $con;

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function getLanguagesByUser($userId)
    {
        $stmt = $this->con->prepare("SELECT * FROM user_languages WHERE user_id = ?");

        $stmt->execute([$userId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addLanguage($userId, $language, $level, $learning)
    {
        $stmt = $this->con->prepare("INSERT INTO user_languages (user_id, language, proficiency_level, learning) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$userId, $language, $level, $learning]);
    }

    public function deleteLanguage($id)
    {
        $stmt = $this->con->prepare("DELETE FROM user_languages WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
