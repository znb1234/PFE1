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
    public function ListingPosts(Request $request, ManagerRegistry $post,PaginatorInterface $paginator)

    {

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT c , u.username
            FROM App\Entity\Post c , App\Entity\User u WHERE c.auteur = u.id  ');

        $post = $query->getArrayResult();return new Response(json_encode($post), 200);

     }}