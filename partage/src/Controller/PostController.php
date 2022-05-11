<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;

use Doctrine\ORM\Mapping\Id;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


class PostController extends AbstractController
{
    #[Route('/getUser', name: 'getUser')]
    public function getUse(Request $request): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(User::class);
        $username = $parameters["username"];


        $user = $repository->findOneByUsername($username);
        $em = $this->getDoctrine()->getManager();
        $isVerified = $em->createQuery('SELECT c.username
            FROM App\Entity\User c ');
        //$user = $query->getArrayResult();


        {
            return $this->json([
                $user

            ]);
        }


    }


    #[Route('/Posting', name: 'posting')]
    public function index(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $userRep = $this->getDoctrine()->getRepository(User::class);

        $username = $parameters["username"];

        $auteur = $userRep->findOneByUsername($username);

        $contenu = $parameters["contenu"];

        $DataType = $parameters["dataType"];
        $category = $parameters["category"];


        $post = new Post();
        $post->setContenu($contenu);
        $post->setCategory($category);
        $post->setDataType($DataType);
        $post->setAuteur($auteur);
        $post->setCreationdate(new DateTime('now'));
        $post->setUpdatetime(new DateTime('now'));
        $entityManager = $doctrine->getManager();
        $entityManager->persist($post);

        $entityManager->flush();

        return new JsonResponse(
            $post
        );


    }

    #[Route('/like', name: 'app_users')]
    public function likepost(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(Post::class);

        $id = $parameters["id"];
        $post = $repository->findOneById($id);
       $manager = $this->getDoctrine()->getManager();


        if ($id == null) {
            return new JsonResponse ("erreur");
        }
    else

    //$i=0;
    $nombrelike = +1;
    $manager->persist((object)$post);
    $manager->flush();
    return new JsonResponse($nombrelike);

    }




    #[Route('/getLikePosts', name: 'apppost')]
    public function getlikePosts (Request $request)
    {
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(Post::class);

        $id = $parameters["id"];
        $post = $repository->findOneById($id);
        return new JsonResponse( $post->getNombrelike());
    }
}