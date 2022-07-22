<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PostUserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostUserRepository::class)]
#[ApiResource]
class PostUser
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: Post::class, cascade: ['persist', 'remove'])]
    private $post;

    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: User::class, cascade: ['persist', 'remove'])]
    private $user;

    /**
     * @return mixed
     */
    public function getPost()
    {
        return $this->post;
    }

    /**
     * @param mixed $post
     */
    public function setPost($post): void
    {
        $this->post = $post;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user): void
    {
        $this->user = $user;
    }
}
