<?php
/**
 * Created by PhpStorm.
 * User: Hendrickbrun
 * Date: 8/18/18
 * Time: 9:07 PM
 */

namespace App\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ArticleController
{

    /**
     * @Route("/")
     */
    public function homepage()
    {
        return new Response('This is my first code');
    }
    /**
     * @Route("/news/{slug}")
     */
    public function show($slug)
    {
        return new Response(sprintf('who are you %s',
            $slug));
    }
}
