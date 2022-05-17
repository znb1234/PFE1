<?php

namespace App\Controller;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use const PHP_EOL;
class notificationController extends AbstractController
{


    #[Route('/validation', name: 'app')]
    public function validation (Request $request, MailerInterface $mailer)
    {
        ini_set('SMTP', "smtp.gmail.com");
        ini_set('smtp_port', "25");

        ini_set('sendmail_from', "email@gmail.com");
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(User::class);
        $email_user = $parameters["email"];


        $message =("félicitations ! Vous avez l 'accés à l'application SHAREVIOO . Vous pouvez maintenant accéder à 
        ton espace personnel dans l'application et partagez vos connaissances avec vos collégues ");

        $message = (new Email())
            ->from('zeinebchebbi44@gmail.com')
            ->to($email_user)
            ->subject('validation ')
            ->text('Sender : ' . 'sharevioo notification' . PHP_EOL .
                $message,
                'text/plain');

        $mailer->send($message);



        //   }
        return new JsonResponse('email send');
    }
    #[Route('/category ', name: 'app')]
    public function category (Request $request, MailerInterface $mailer)
    {

        ini_set('smtp_port', "25");

        ini_set('sendmail_from', "email@gmail.com");
        $parameters = json_decode($request->getContent(), true);
        $email_user = $parameters["email"];
        $message =("cher wevioo collaborateur ,
         l'un de vous collégues a poster un publication de category 
         .vous pouver accéder au plateforme pour le consulter ");

        $message = (new Email())
            ->from('zeinebchebbi44@gmail.com')
            ->to($email_user)
            ->subject("publication de categorie  ..." )
            ->text('Sender : ' . 'sharevioo notification' . PHP_EOL .
                $message,
                'text/plain');

        $mailer->send($message);


        return new JsonResponse('email send');
    }
}