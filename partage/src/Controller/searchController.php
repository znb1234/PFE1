<?php

namespace App\Controller;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;


use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Post;
use App\Entity\User;


class searchController extends AbstractController
{
    #[Route('/SearchPostsbyusername', name: 'SearchP')]
public function searchPostbyusername (Request $request) {
    $parameters = json_decode($request->getContent(), true);
    $repository = $this->getDoctrine()->getRepository(Post::class);
    $auteur = $parameters["auteur"];
    $post = $repository-> find($auteur);

    $em = $this->getDoctrine()->getManager();
    $query = $em->createQuery('SELECT c
       FROM App\Entity\Post c , App\Entity\User u WHERE  u.id = c.auteur ');

    $post = $query->getArrayResult();
    return new Response(json_encode($post), 200);


}
#[Route('/SearchPostsbycategory', name: 'SearchP')]
public function searchPostbycategory (Request $request) {
    $parameters = json_decode($request->getContent(), true);
    $repository = $this->getDoctrine()->getRepository(Post::class);
    $category = $parameters["category"];
    $post = $repository-> find($category);

   // $em = $this->getDoctrine()->getManager();
   // $query = $em->createQuery('SELECT c
     //  FROM App\Entity\Post c , App\Entity\User u WHERE  u.id = c.auteur ');

 //   $post = $query->getArrayResult();
    return new Response(json_encode($post), 200);


}
#[Route('/SearchPostsdescription', name: 'SearchPD')]
public function searchPostbydescription (Request $request) {
    $parameters = json_decode($request->getContent(), true);
    $repository = $this->getDoctrine()->getRepository(Post::class);
    $description= $parameters["description"];
    $post = $repository-> findBy($description);

   // $em = $this->getDoctrine()->getManager();
   // $query = $em->createQuery('SELECT c
     //  FROM App\Entity\Post c , App\Entity\User u WHERE  u.id = c.auteur ');

 //   $post = $query->getArrayResult();
    return new Response(json_encode($post), 200);


}
}