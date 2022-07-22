<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\PostUser;
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

        $description = $parameters["description"];
        $category = $parameters["category"];


        $post = new Post();
        $post->setContenu($contenu);
        $post->setCategory($category);
        $post->setDescription($description);
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

    #[Route('/like', name: 'app_like_users_post')]
    public function likePost(Request $request)
    {

        $parameters = json_decode($request->getContent(), true);
        $userRep = $this->getDoctrine()->getRepository(User::class);
        $postRep = $this->getDoctrine()->getRepository(Post::class);
        $id_post = $parameters["id_post"];
        $id_user = $parameters["id_user"];

        $userPost = new PostUser();





         return new JsonResponse('post is liked ');
    }




    #[Route('/getLikePosts', name: 'apppost')]
    public function getlikePosts ($post , $user)
    {
       $qb=$this->creatQueryBuilder ('b')
       ->select ('Count(b)')
           ->where ('b.user=:user')
           ->andwhere('b.post=:post')
           ->setParameter('post',$post)
           ->setParameter ('user',$user);
       return new JsonResponse($qb ->getQuery()->getSingleScalarResult());
    }


#[Route('/approuve', name: 'app')]
    public function approuve (Request $request ){
    $id = json_decode($request->getContent(), true);
    $repository = $this->getDoctrine()->getRepository(Post::class);

    $manager = $this->getDoctrine()->getManager();
    $post = $repository->findOneBy($id);
    if ($id==null){
        return new JsonResponse ("erreur");
    }
    $post->setIsApprouved(!$post->IsApprouved ());
    $manager->persist($post);
    $manager->flush();
    return new JsonResponse('post approuved or disprouved  ');

}
    #[Route('/nombrePosts ', name: 'nombrePosts')]
    public function nombrePosts (Request $request): JsonResponse
    {


        $repository = $this->getDoctrine()->getRepository(Post::class);

        return new JsonResponse ( $repository->createQueryBuilder('u')
            ->select('count(u.id)')

            ->getQuery()
            ->getSingleScalarResult()
        );
    }
    public function nombrePostsC (Request $request): JsonResponse
    {


        $repository = $this->getDoctrine()->getRepository(Post::class);

        return new JsonResponse ( $repository->createQueryBuilder('p')
            ->select('count(p.id)')

            ->where('p.category = ?1')
            ->setParameter(1, 'Consulting')
            ->getQuery()
            ->getSingleScalarResult()
        );
    }
    public function nombrePostsD (Request $request): JsonResponse
    {


        $repository = $this->getDoctrine()->getRepository(Post::class);

        return new JsonResponse ( $repository->createQueryBuilder('p')
            ->select('count(p.id)')

            ->where('p.category = ?2 ')
            ->setParameter(2, 'Digital')
            ->getQuery()
            ->getSingleScalarResult()
        );
    }

    public function nombrePostsT (Request $request): JsonResponse
    {


        $repository = $this->getDoctrine()->getRepository(Post::class);

        return new JsonResponse ( $repository->createQueryBuilder('p')
            ->select('count(p.id)')

            ->where('p.category = ?3')
            ->setParameter(3, 'Technology')
            ->getQuery()
            ->getSingleScalarResult()
        );
    }

   }