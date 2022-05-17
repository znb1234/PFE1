<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

class PostUser
{

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy:"likedPosts")]
    private $idUser;

    #[ORM\ManyToOne(targetEntity: Post::class, inversedBy:"likedPosts")]
    private $idPost;

    /**
     * @return mixed
     */
    public function getIdUser()
    {
        return $this->idUser;
    }

    /**
     * @param mixed $idUser
     */
    public function setIdUser($idUser): void
    {
        $this->idUser = $idUser;
    }

    /**
     * @return mixed
     */
    public function getIdPost()
    {
        return $this->idPost;
    }

    /**
     * @param mixed $idPost
     */
    public function setIdPost($idPost): void
    {
        $this->idPost = $idPost;
    }

}