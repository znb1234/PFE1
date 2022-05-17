<?php


namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;


use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;


class CommentContoller extends AbstractController
{

    #[Route('/getPost', name: 'getPost')]
    public function getPost(Request $request): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(Post::class);

        $auteur=$parameters ["auteur"];
        $a =$repository ->find($auteur);
        return new JsonResponse($a);}




    #[Route('/Comment', name: 'Comment')]
    public function create (Request $request,ManagerRegistry $doctrine): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $postRep=  $this->getDoctrine()->getRepository(Post::class);
        $idPost= $parameters["idPost"];
       $post= $postRep->find($idPost);


        $userRep=  $this->getDoctrine()->getRepository(User::class);
        $idUser= $parameters["idUser"];

        $auteur= $userRep->find($idUser);



        $contenu =$parameters["contenu"];


        $Comment = new Comment();
        $Comment->setContenu($contenu);
        $Comment->setAuteur($auteur);
        $Comment->setPost($post);
        $Comment-> setDatecreation(new \DateTime('now'));
        $Comment->setLastupdate(new \DateTime('now'));

        $entityManager = $doctrine->getManager();
        $entityManager->persist($Comment);

        $entityManager->flush();

        return new JsonResponse(
            "comment added to DB"
        );







    }




}




