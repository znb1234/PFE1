<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Post::class)]
    private $description;

    public function __construct()
    {
        $this->description = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, post>
     */
    public function getDescription(): Collection
    {
        return $this->description;
    }

    public function addDescription(post $description): self
    {
        if (!$this->description->contains($description)) {
            $this->description[] = $description;
            $description->setCategory($this);
        }

        return $this;
    }

    public function removeDescription(post $description): self
    {
        if ($this->description->removeElement($description)) {
            // set the owning side to null (unless already changed)
            if ($description->getCategory() === $this) {
                $description->setCategory(null);
            }
        }

        return $this;
    }
}
