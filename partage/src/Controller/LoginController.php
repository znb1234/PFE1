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

        $user = $repository->findOneByUsername($username);
        $em = $this->getDoctrine()->getManager();
        $isVerified =$user-> IsVerified();


        if ( ! empty($user) && ($isVerified==true) && $hasher->isPasswordValid($user, $plaintextPassword)
        ) {

            $payload = [
                "username" => $user->getUsername(),
                "exp" => (new \DateTime())->modify("+5 minutes")->getTimestamp(),
            ];


            $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
            return $this->json([
                'status' => 200,
                'token' => sprintf('Bearer %s', $jwt), 'username' => $user->getUsername(),
                'password' => $user->getPassword(),
                'roles' => $user->getRoles(),'id'=>$user-> getId()
            ]);}
            //  return $this->json(['status'=>200,
            //  'username' =>$user->getUsername(),
            //  'password'=>$user->getPassword(),
            // 'roles'=>$user->getRoles()
            // ]);
       // else if ($isVerified==0)
     //   { return new JsonResponse(['status' => 404, 'response' => "merci d'attendre la vérification de l'utilisateur "]);}

else if (empty($user)||empty($isVerified)){     return new JsonResponse(['status' => 404, 'response' => "l'utilisateur n'est pas inscrit "]);}
        else
            if (! ($hasher->isPasswordValid($user, $plaintextPassword))) {
                return new JsonResponse(['status' => 404, 'response' => "mot de passe incorrect "]);
            }

else if (($isVerified==false))
{    return new JsonResponse(['status' => 404, 'response' => "l'utilisateur est non vérifié"]);}

    return new JsonResponse(['status' => 404, 'response' => "erreur "]);}




    #[Route('/logout', name: 'app_logout', methods: ['GET'])]
    public function logout()
    {
        return new JsonResponse(['status' => 200, 'response'=> "User is logged out"]);
        // controller can be blank: it will never be called!
       // throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }}
