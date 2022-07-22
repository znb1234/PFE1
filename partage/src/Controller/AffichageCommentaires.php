<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
class AffichageCommentaires extends AbstractController
{
    #[Route('/ListingComment', name: 'ListingC')]
    public function ListingComments(Request $request, ManagerRegistry $comment,PaginatorInterface $paginator)

    {

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT c
            FROM App\Entity\Comment c ');
        $comment = $query->getArrayResult();
        return new Response(json_encode($comment), 200);

    }
}