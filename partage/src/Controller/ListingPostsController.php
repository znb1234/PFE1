<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\UserPost;
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
        $query = $em->createQuery('SELECT c.id,c.contenu,c.category ,c.updatetime, c.description , u.username , c.isApprouved
            FROM App\Entity\Post c , App\Entity\User u WHERE c.auteur = u.id  ');

        $post = $query->getArrayResult();return new JsonResponse ($post, 200);

     }


    #[Route(' /AffichagePostsApprouved', name: 'ListingP')]
    public function AffichagePostsApprouved (Request $request, ManagerRegistry $post)

    {

      //  $repository = $this->getDoctrine()->getRepository(Post::class);
        $em = $this->getDoctrine()->getManager();
         $post=$em->createQueryBuilder('c','e')
             ->select('c,c.contenu , e.username')
             ->from ('App\Entity\Post','c'  )
             ->from('App\Entity\User','e')
             ->where('c.isApprouved = 1 ')
             ->andWhere ('c.auteur = e.id')
             ->getQuery()
             ->getArrayResult()
        ;
     return new JsonResponse ($post);
}}