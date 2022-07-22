<?php


namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;


use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;


class CommentContoller extends AbstractController
{

    #[Route('/getPost', name: 'getPost')]
    public function getPost(Request $request): JsonResponse
    {

        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(Post::class);
        $auteurId = $parameters["auteurId"];
        $repositoryU = $this->getDoctrine()->getRepository(User::class);
        $auteur = $repositoryU->findById($auteurId);
        $auteurs = $repository->findByAuteur($auteur);
        return $this->json([$auteurs, $auteur]);
    }

    #[Route('/getComment', name: 'getPost')]
    public function getComment(Request $request)
    {

        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(Comment::class);
       $repositoryP = $this->getDoctrine()->getRepository(User::class);
        $repositoryU = $this->getDoctrine()->getRepository(Post::class);
        $post = $parameters["post_Id"];
       // $user_Id = $parameters["user_Id"];
        //$user = $repositoryP-> findById($user_Id);
        $posts = $repositoryU->findById($post);

        $comments = $repository->findByPost($posts);
        return $this->json([$comments]);

    }



    #[Route('/Comment', name: 'Comment')]
    public function create (Request $request,ManagerRegistry $doctrine): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $postRep=  $this->getDoctrine()->getRepository(Post::class);
        $idPost= $parameters["idPost"];
        $post= $postRep->find($idPost);
        $userRep=  $this->getDoctrine()->getRepository(User::class);
        $idUser= $parameters["idUser"];
        $auteur= $userRep->find($idUser);
        $contenu =$parameters["contenu"];
        $Comment = new Comment();
        $Comment->setContenu($contenu);
        $Comment->setAuteur($auteur);
        $Comment->setPost($post);
        $Comment-> setDatecreation(new \DateTime('now'));
        $Comment->setLastupdate(new \DateTime('now'));

        $entityManager = $doctrine->getManager();
        $entityManager->persist($Comment);

        $entityManager->flush();

        return $this->json([$Comment]);





    }

    #[Route('/nombrecomment', name: 'nombre_comment')]
    public function nombreComment(Request $request): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $id_post = $parameters["post"];
        $post = $this->getDoctrine()->getRepository(\App\Entity\Post::class)->findOneBy(['id'=>$id_post]);
        if (!$post) {
            throw $this->createNotFoundException('The post does not exist');
        }

        $repository = $this->getDoctrine()->getRepository(Comment::class);

        return new JsonResponse ( $repository->createQueryBuilder('c')
            ->select('count(c.id)')
            ->where('c.post = :post')
            ->setParameter('post', $id_post)
            ->getQuery()
            ->getSingleScalarResult()
        );
    }






}




