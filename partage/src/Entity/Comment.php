<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CommentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CommentRepository::class)]

#[ApiResource( normalizationContext: [
    'groups' => ['comment'],
],
    denormalizationContext: [
        'groups' => ['comment'],
    ],
)]


class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["comment"])]
    private $id;


    #[ORM\ManyToOne(targetEntity: User::class)]
    #[Groups(["comment"])]
    private $auteur;

    #[ORM\ManyToOne(targetEntity: Post::class)]
    #[Groups(["comment"])]
    private $post;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(["comment"])]
    private $contenu;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(["comment"])]
    private $datecreation;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(["comment"])]
    private $lastupdate;

    public function __construct()
    {
    //    $this->auteur = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getAuteur()
    {
        return $this->auteur;
    }


    public function setAuteur(User $auteur): self
    {
        $this->auteur = $auteur;

        return $this;
    }

    public function addAuteur(user $auteur): self
    {
        if (!$this->auteur->contains($auteur)) {
            $this->auteur[] = $auteur;
        }

        return $this;
    }

    public function removeAuteur(user $auteur): self
    {
        $this->auteur->removeElement($auteur);

        return $this;
    }


    public function getPost()
    {
        return $this->post;
    }
    public function setPost(Post $post): self
    {
        $this->post = $post;

        return $this;
    }

    public function addPost(Post $post): self
    {
        if (!$this->post->contains($post)) {
            $this->post[] = $post;
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        $this->post->removeElement($post);

        return $this;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(?string $contenu): self
    {
        $this->contenu = $contenu;

        return $this;
    }


    public function getDatecreation(): ?\DateTimeInterface
    {
        return $this->datecreation;
    }

    public function setDatecreation(?\DateTimeInterface $datecreation): self
    {
        $this->datecreation = $datecreation;

        return $this;
    }

    public function getLastupdate(): ?\DateTimeInterface
    {
        return $this->lastupdate;
    }

    public function setLastupdate(?\DateTimeInterface $lastupdate): self
    {
        $this->lastupdate = $lastupdate;

        return $this;
    }
}
