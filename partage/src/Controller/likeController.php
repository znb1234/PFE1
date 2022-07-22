<?php

namespace App\Controller;

use App\Entity\PostUser;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;

use phpDocumentor\Reflection\Types\Boolean;
use Proxies\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use function Symfony\Component\Translation\t;
use Doctrine\DBAL\Schema\Table;

class likeController extends AbstractController {
    #[Route('/likePost', name:'like')]
    public function likePost (Request $request , ManagerRegistry $doctrine): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $entityManager = $doctrine->getManager();
        $repositoryP = $this->getDoctrine()->getRepository(\App\Entity\UserPost::class);
        $repositoryU = $this->getDoctrine()->getRepository(\App\Entity\User::class);
        $repository = $this->getDoctrine()->getRepository(\App\Entity\User::class);
        $id_post = $parameters["id_post"];
        $id_user = $parameters["id_user"];

        $post = $this->getDoctrine()->getRepository(\App\Entity\Post::class)->findOneBy(['id'=>$id_post]);
        if (!$post) {
           return new JsonResponse('The post does not exist');
        }
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['id' =>$id_user]);
        if (!$user) {
           return new JsonResponse('The user does not exist');
        }
        $postUser = $this->getDoctrine()->getRepository(\App\Entity\PostUser::class)
            ->findOneBy(['post'=>$id_post, 'user'=>$id_user]);

        if ($postUser) {
            return new JsonResponse(data: 'post already liked',status: 422);
        }

       // $idU = $repository->find($id_user);
        $like  = new PostUser();
      //if (!$this->isLiked($id_post, $id_user)){
        $nombre_like=0;
        $like->setPost($post);
        $like->setUser($user);
        $entityManager->persist($like);
        $entityManager->flush();
        $nombre_like+=1;
    //}
        return new JsonResponse(['status'=> 'ok']);
        /* // $likeU = $repositoryU->findOneById($id_user);
         // $likeP = $repositoryP->findOneById($id_post);
      $like  = new PostUser ();
      $like->setIdpost($id_post);
      $like->setIduser($id_user);
      $entityManager = $doctrine->getManager();
      $nombre_like=0;
      $entityManager->persist($like);
      $entityManager->flush();
      $nombre_like+=1;*/

    }

    private function  isLiked (int $idPost, int $idUser ):bool
    {
        Boolean::$like = false;
        $repositoryPU = $this->getDoctrine()->getRepository(PostUser::class);
        $trouve = $repositoryPU->findBy (['idPost'=>$idPost ,'idUser'=>$idUser ]);
        empty($trouve)? $like =false:$like= true ;
        return $like;
    }

    #[Route('/nombrelike', name: 'nombrelike')]
    public function nombreLike(Request $request): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $id_post = $parameters["post"];
        $post = $this->getDoctrine()->getRepository(\App\Entity\Post::class)->findOneBy(['id'=>$id_post]);
        if (!$post) {
        return new JsonResponse('erreur');
        }

        $repository = $this->getDoctrine()->getRepository(PostUser::class);

        return new JsonResponse ( $repository->createQueryBuilder('u')
            ->select('count(u.post)')
            ->where('u.post = :post')
            ->setParameter('post', $id_post)
            ->getQuery()
            ->getSingleScalarResult()
        );
    }
    #[Route('/nombreLikeTotale ', name: 'nombrelike')]
    public function nombreLikeTotale (Request $request): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
      //  $id_post = $parameters["post"];
        //$post = $this->getDoctrine()->getRepository(\App\Entity\Post::class)->findOneBy(['id'=>$id_post]);
        //if (!$post) {
      //      throw $this->createNotFoundException('The post does not exist');
        //}

        $repository = $this->getDoctrine()->getRepository(PostUser::class);

        return new JsonResponse ( $repository->createQueryBuilder('u')
            ->select('count(u.post)')

            ->getQuery()
            ->getSingleScalarResult()
        );
    }

    #[Route('/nombrelikeMax', name: 'nombrelike')]
    public function nombreLikeMax(Request $request): JsonResponse
    {


        $repository = $this->getDoctrine()->getRepository(PostUser::class);

        return new JsonResponse (  $repository->createQueryBuilder('u')
            ->select('count(u.post)')
            ->select('count(u.user)')
            ->groupBy('u.post')
            ->orderBy('count(u.post)')
                ->getQuery()
                ->getScalarResult()



         );
    }

}