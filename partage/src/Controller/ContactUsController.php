<?php

namespace App\Controller;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use const PHP_EOL;

class ContactUsController extends AbstractController
{

    #[Route('/ContactUs', name: 'ContactUs')]
    public function Contact (Request $request, MailerInterface $mailer)
    {
        ini_set('SMTP', "smtp.gmail.com");
        ini_set('smtp_port', "25");

        ini_set('sendmail_from', "email@gmail.com");
        $parameters = json_decode($request->getContent(), true);
        $repository = $this->getDoctrine()->getRepository(User::class);
        $email = $parameters["email"];
        //  $id = $parameters ["id "];
        // $user = $repository->findOneById($id);
        $em = $this->getDoctrine()->getManager();
        $subject = $parameters ["subject"];
        $message =$parameters["message"];
        //if ( $user) {
        $message = (new Email())
            ->from($email)
            ->to('zeinebchebbi44@gmail.com')
            ->subject($subject)
            ->text('Sender : ' . $email . PHP_EOL .
                $message,
                'text/plain');

            $mailer->send($message);



        //   }
        return new JsonResponse('email send');
}
}