<?php


namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use Doctrine\Persistence\ManagerRegistry;

#[Route('/home', name: 'home')]
/**
 * @method ({"GET"})
 */
class UserController extends AbstractController
{

        public function getUsers(ManagerRegistry $doctrine): Response
    {
      $users = $this ->getUser();
        $doctrine->getRepository(User::class)->findAll();


        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($users));

        return $response;


}}