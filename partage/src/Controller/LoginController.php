<?php
namespace App\Controller;

use App\Entity\User ;
use Namshi\JOSE\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Doctrine\Persistence\ManagerRegistry ;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\User\UserInterface ;
class LoginController extends AbstractController
{
#[Route('/login', name:'login')]
     public function index(Request $request, UserPasswordHasherInterface $hasher): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(User::class);
        $username = $parameters["username"];
        $plaintextPassword = $parameters["password"];
        //$isVerified = $parameters  ["isVerified"];
        $user = $repository->findOneByUsername($username);
        $em = $this->getDoctrine()->getManager();
        $isVerified = $em->createQuery('SELECT c.isVerified
            FROM App\Entity\User c ');
        //$user = $query->getArrayResult();


        if (($isVerified) && $user && $hasher->isPasswordValid($user, $plaintextPassword) ) {

            $payload = [
                "username" => $user->getUsername(),
                "exp" => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
            ];


            $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
            return $this->json([
                'status' => 200,
                'token' => sprintf('Bearer %s', $jwt), 'username' => $user->getUsername(),
                'password' => $user->getPassword(),
                'roles' => $user->getRoles()
            ]);}
            //  return $this->json(['status'=>200,
            //  'username' =>$user->getUsername(),
            //  'password'=>$user->getPassword(),
            // 'roles'=>$user->getRoles()
            // ]);
       // else if ($isVerified==0)
     //   { return new JsonResponse(['status' => 404, 'response' => "merci d'attendre la vérification de l'utilisateur "]);}

else if (!$user){     return new JsonResponse(['status' => 404, 'response' => "user not found"]);}
        else
            if (! ($hasher->isPasswordValid($user, $plaintextPassword))) {
                return new JsonResponse(['status' => 404, 'response' => "invalid password"]);
            }


    return new JsonResponse(['status' => 404, 'response' => "user inverified"]);}




    #[Route('/logout', name: 'app_logout', methods: ['GET'])]
    public function logout()
    {
        return new JsonResponse(['status' => 200, 'response'=> "User is logged out"]);
        // controller can be blank: it will never be called!
       // throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}