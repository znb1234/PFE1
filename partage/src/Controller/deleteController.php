<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class deleteController extends AbstractController
{
    public function DeletePost(Request $request ,ManagerRegistry $doctrine){



        $parameters = json_decode($request->getContent(), true);
        $postRep=  $this->getDoctrine()->getRepository(Post::class);

        $id = $parameters["id"];

        $post= $postRep->find($id);

        $contenu = $parameters["contenu"];




        $post->setContenu($contenu);


        $post->setUpdatetime(new \DateTime('now'));
        $entityManager = $doctrine->getManager();
        $entityManager->remove($post);

        $entityManager->flush();

        return new JsonResponse(
            $post
        );
    }


    public function DeleteComment (Request $request ,ManagerRegistry $doctrine){



        $parameters = json_decode($request->getContent(), true);
        $commentRep=  $this->getDoctrine()->getRepository(Comment::class);

        $id = $parameters["id"];

        $comment= $commentRep->find($id);

        $contenu = $parameters["contenu"];




        $comment->setContenu($contenu);


        $comment->setUpdatetime(new \DateTime('now'));
        $entityManager = $doctrine->getManager();
        $entityManager->remove($comment);

        $entityManager->flush();

        return new JsonResponse(
            $comment
        );
    }
}