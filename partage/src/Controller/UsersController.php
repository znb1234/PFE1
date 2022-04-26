<?php

namespace App\Controller;

use Knp\Component\Pager\PaginatorInterface;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Json ;
class UsersController extends AbstractController
{
    #[Route('/users', name: 'app_users')]
    public function getUsers(Request $request
     , ManagerRegistry $user,PaginatorInterface $paginator
    )

    {

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT c.username ,c.email,c.isVerified
            FROM App\Entity\User c ');
        $user = $query->getArrayResult();return new Response(json_encode($user), 200);

        $users = $paginator->paginate(
            $em,
            $request->query->getInt('page', 1),
            6
        );}








    #[Route('/activate/:$username', name: 'app_users')]
public function activate (Request $request ){
        $username = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(User::class);
       // $username = $parameters['username'];
        $manager = $this->getDoctrine()->getManager();
        $user = $repository->findOneByUsername($username);
        $user->setIsVerified(true);
        $manager->persist($user);
        $manager->flush();
        return new JsonResponse('activation is done');


    }
    #[Route('/activate', name: 'app_users')]
    public function verifyUser (Request $request ){
        $username = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(User::class);
        // $username = $parameters['username'];
        $manager = $this->getDoctrine()->getManager();
        $user = $repository->findOneByUsername($username);
        if ($user==null){
            return new JsonResponse ("unknown user");
        }
        $user->setIsVerified(!$user->IsVerified());
        $manager->persist($user);
        $manager->flush();
        return new JsonResponse('verification is done ');

    }






    #[Route('/disactivate', name: 'app_users')]
public function disactivate (Request $request)
{
    $username = json_decode($request->getContent(), true);
    $repository = $this->getDoctrine()->getRepository(User::class);
    // $username = $parameters['username'];
    $manager = $this->getDoctrine()->getManager();
    $user = $repository->findOneByUsername($username);
    $user->setIsVerified(false);
    $manager->persist($user);
    $manager->flush();
    return new JsonResponse('disactivation is done');
}
}




           // $users = [
             //   ['id' => 32, 'email' => "admin@admin.lan ", 'username' => "admin1  ", 'is_verified' => "0", 'roles' => ['ROLE_ADMIN']],
               // ['id' => 33, 'email' => " mohamed1@gmail.com", 'username' => "mohamed1", 'is_verified' => "0", 'roles' => ['ROLE_USER']],
              //  ['id' => 34, 'email' => " ala2@gmail.com", 'username' => "ala2 ", 'is_verified' => "0", 'roles' => ['ROLE_USER']],
               // ['id' => 35, 'email' => "amel3@gmail.com ", 'username' => "amel3 ", 'is_verified' => "0", 'roles' => ['ROLE_USER']],
             //   ['id' => 36, 'email' => "amin4@gmail.com ", 'username' => "amin4", 'is_verified' => "0", 'roles' => ['ROLE_USER']],
             //   ['id' => 37, 'email' => " ali7@gmail.com", 'username' => "ali7", 'is_verified' => "0", 'roles' => ['ROLE_USER']],
             //   ['id' => 38, 'email' => "ali5@gmail.com ", 'username' => "ali5", 'is_verified' => "0", 'roles' => ['ROLE_USER']]
          //  ];
   //     }

     //   $response = new JsonResponse(
       //     $user = $this->getUser()
        // 'username' =>$user->getUsername(),
        //'email'=>$user->getEmail(),
        //'roles'=>$user->getRoles(),
        //'isVerified'=>$user
        //]
      //  );

//$response->headers->set('Content-Type', 'application/json');
//$response->headers->set('Access-Control-Allow-Origin', '*');

        //$response->setContent(json_encode($users));

        //return $response;


