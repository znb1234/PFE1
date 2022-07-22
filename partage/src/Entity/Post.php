<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource( normalizationContext: [
    'groups' => ['post'],
],
    denormalizationContext: [
        'groups' => ['post'],
    ],
)]
#[ORM\Entity(repositoryClass: PostRepository::class)]

class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["post"])]
    private $id;


    #[ORM\ManyToOne(targetEntity: User::class)]
    #[Groups(["post"])]
    private $auteur;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(["post"])]
    private $creationdate;

    #[ORM\Column(type: 'text', nullable: false)]
    #[Groups(["post"])]
    private $contenu;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(["post"])]
    private $updatetime;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["post"])]
    private $description;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["post"])]
    private $category;


     #[Groups(["post"])]
     #[ORM\Column(type: 'boolean')]
     private $isApprouved = false;

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

}
