<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{


    // private EmailVerifier $emailVerifier;

    //   public function __construct(EmailVerifier $emailVerifier)
    // {
    //   $this->emailVerifier = $emailVerifier;}
    #[Route('/register', name: 'app_register')]
    public function index(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(User::class);
        $password = $parameters["password"];
        $email = $parameters["email"];
        $username = $parameters["username"];


        $user = $repository->findOneByEmail($email);

        if (is_null($user)) {
            $entityManager = $this->getDoctrine()->getManager();

            $user = new User();
            $user->setUserIdentifier($email);
            $user->setUsername($username);
            $hashedPassword = $passwordHasher->hashPassword($user, $password);
            $user->setPassword($hashedPassword);
            $user->setRoles(['ROLE_USER']);
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json(['status' => 200, 'response' => "user added",
            'user' => $user->getEmail()
        ]);
        }


        return $this->json(['status' => 404, 'response' => "There is already an account with this email"]);
        //$sql = "INSERT INTO user (email, password,roles,username) VALUES ('$email','$password','$roles','$username')";
    }
}




//   $user = new User();
// $form = $this->createForm(RegistrationFormType::class, $user);
//$form->handleRequest($request);

//if ($form->isSubmitted() && $form->isValid()) {
// encode the plain password
//  $user->setPassword(
//$userPasswordHasher->hashPassword(
//        $user,
//      $form->get('plainPassword')->getData()
//)
//);

//$entityManager->persist($user);
//$entityManager->flush();
//return $this->redirectToRoute('register');}

// generate a signed url and email it to the user
// $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
//   (new TemplatedEmail())
//     ->from(new Address('zeinebchebbi44@gmail.com', 'BOT'))
//   ->to($user->getEmail())
// ->subject('Please Confirm your Email')
//  ->htmlTemplate('registration/confirmation_email.html.index.html.twig')
//  );


// }


//return $this->json([
//  'email' => $user->getUserIdentifier(),
//'password'=>$user->getPassword(),
//'roles'=>$user->getRoles()
//]);
//}

//  #[Route('/verify/email', name: 'app_verify_email')]
//public function verifyUserEmail(Request $request): Response
//{
//  $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

// validate email confirmation link, sets User::isVerified=true and persists
//try {
//  $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
//} catch (VerifyEmailExceptionInterface $exception) {
//  $this->addFlash('verify_email_error', $exception->getReason());

//return $this->redirectToRoute('app_register');
//}


//$this->addFlash('success', 'Your email address has been verified.');

// return $this->redirectToRoute('app_register');
//}
//}
