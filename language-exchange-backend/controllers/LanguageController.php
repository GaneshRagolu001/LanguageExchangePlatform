<?php
require_once __DIR__ . '/../models/Language.php';

class LanguageController
{

    private $launguageModel;

    public function __construct($pdo)
    {
        $this->launguageModel = new Language($pdo);
    }

    public function getLanguagesByUser($userId)
    {
        return $this->launguageModel->getLanguagesByUser($userId);
    }

    public function addLanguage($userId, $language, $level, $learning)
    {
        return $this->launguageModel->addLanguage($userId, $language, $level, $learning);
    }

    public function deleteLanguage($id)
    {
        return $this->launguageModel->deleteLanguage($id);
    }
}
