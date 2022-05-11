<?php

namespace App\Controller;
use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class updateController extends AbstractController
{


    public function updatePost(Request $request ,ManagerRegistry $doctrine){


        $em = $this->getDoctrine()->getManager();
        $parameters = json_decode($request->getContent(), true);
        $postRep=  $this->getDoctrine()->getRepository(Post::class);

        $id = $parameters["id"];

        $post= $postRep->find($id);

        $query = $em->createQuery('SELECT c.contenu 
            FROM App\Entity\Post c ');

        $contenu = $parameters["contenu"];




        $post->setContenu($contenu);
        $post->setUpdatetime(new \DateTime('now'));
        $entityManager = $doctrine->getManager();
        $entityManager->persist($post);

        $entityManager->flush();

        return new JsonResponse(
            $post
        );
    }



    public function updateComment (Request $request ,ManagerRegistry $doctrine){


        $em = $this->getDoctrine()->getManager();
        $parameters = json_decode($request->getContent(), true);
        $commentRep=  $this->getDoctrine()->getRepository(Comment::class);

        $id = $parameters["id"];

        $comment= $commentRep->find($id);

        $query = $em->createQuery('SELECT c.contenu 
            FROM App\Entity\Comment c ');

        $contenu = $parameters["contenu"];




        $comment->setContenu($contenu);
        $comment->setUpdatetime(new \DateTime('now'));
        $entityManager = $doctrine->getManager();
        $entityManager->persist($comment);

        $entityManager->flush();

        return new JsonResponse(
            $comment
        );
    }
}