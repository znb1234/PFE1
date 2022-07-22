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
        $repositoryU = $this->getDoctrine()->getRepository(User::class);
    $username = $parameters["username"];
    $auteurR = $repositoryU-> findBy(["username"=>$username]);
$post=$repository->findBy($auteurR);

        return $this->json([$post,$username]);


}
#[Route('/SearchPostsbycategory', name: 'SearchP')]
public function searchPostbycategory (Request $request) {
    $parameters = json_decode($request->getContent(), true);
    $repository = $this->getDoctrine()->getRepository(Post::class);
    $category = $parameters["category"];
    $post = $repository-> findBy(['category'=>$category]);


   // $em = $this->getDoctrine()->getManager();
   // $query = $em->createQuery('SELECT c
     //  FROM App\Entity\Post c , App\Entity\User u WHERE  u.id = c.auteur ');

 //   $post = $query->getArrayResult();
    return $this->json([$post]);



}
#[Route('/SearchPostsdescription', name: 'SearchPD')]
public function searchPostbydescription (Request $request) {
    $parameters = json_decode($request->getContent(), true);
    $repository = $this->getDoctrine()->getRepository(Post::class);
    $description= $parameters["description"];

    $post = $repository-> findBy(['description'=>$description]);


    return $this->json([$post]);


}
}