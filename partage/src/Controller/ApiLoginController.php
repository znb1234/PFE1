<?php

namespace App\Controller;
use App\Entity\User ;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiLoginController extends AbstractController
{
    #[Route('/api', name: 'app_api_login')]

     public function index( ? User $user): Response
    { if (null === $user) {
                     return $this->json([
                         'message' => 'missing credentials',
                         ], Response::HTTP_UNAUTHORIZED);
     }

                 $token =0000; // somehow create an API token for $user

        return $this->json([
            'user'  => $user->getUserIdentifier(),
                         'token' => $token,
        ]);
    }
}
