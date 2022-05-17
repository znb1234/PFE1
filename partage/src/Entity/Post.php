<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Boolean;

#[ORM\Entity(repositoryClass: PostRepository::class)]
#[ApiResource]
class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToMany(targetEntity: PostUser::class, mappedBy:"idPost")]
    private $LikedPost;

    #[ORM\Column(type: 'boolean')]
    private bool $isApprouved = false;

    /**
     * @return bool
     */
    public function isApprouved(): bool
    {
        return $this->isApprouved;
    }

    /**
     * @param bool $isApprouved
     */
    public function setIsApprouved(bool $isApprouved): void
    {
        $this->isApprouved = $isApprouved;
    }


    #[ORM\ManyToOne(targetEntity: User::class)]
    private $auteur;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $creationdate;

    #[ORM\Column(type: 'text', nullable: true)]
    private $contenu;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatetime;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $description;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $category;

    public function __construct()
    {
        $this->auteur = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuteur()
    {
        return $this->auteur;
    }

    public function addAuteur(user $auteur): self
    {
        if (!$this->auteur->contains($auteur)) {
            $this->auteur[] = $auteur;
        }

        return $this;
    }

    public function setAuteur(user $auteur): self
    {
        $this->auteur = $auteur;

        return $this;
    }

    public function removeAuteur(user $auteur): self
    {
        $this->auteur->removeElement($auteur);

        return $this;
    }


    public function getCreationdate(): ?\DateTimeInterface
    {
        return $this->creationdate;
    }

    public function setCreationdate(?\DateTimeInterface $creationdate): self
    {
        $this->creationdate = $creationdate;

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

    public function getUpdatetime(): ?\DateTimeInterface
    {
        return $this->updatetime;
    }

    public function setUpdatetime(?\DateTimeInterface $updatetime): self
    {
        $this->updatetime = $updatetime;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): self
    {
        $this->category = $category;

        return $this;
    }



}
