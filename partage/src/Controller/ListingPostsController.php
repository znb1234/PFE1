<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Post;


class ListingPostsController extends AbstractController
{




    #[Route('/ListingPosts', name: 'ListingP')]
    public function ListingPosts(Request $request, ManagerRegistry $post)

    {

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT c.id,c.contenu,c.category ,c.updatetime, c.description , u.username
            FROM App\Entity\Post c , App\Entity\User u WHERE c.auteur = u.id  ');

        $post = $query->getArrayResult();return new JsonResponse ($post, 200);

     }


    #[Route('/ListingApprouvedPosts', name: 'ListingP')]
    public function AffichagePostsApprouvé (Request $request, ManagerRegistry $post)

    {
        $p = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(Post::class);

        $id =$p ["id"];
         $post= $repository->find ($id);


        $isApprouved =$post-> isApprouved();
if ( $isApprouved  )
{ return new  JsonResponse(json_encode($post), 200);}
return new JsonResponse($post,200);

    }
}