<?php
/**
 * Created by PhpStorm.
 * User: Hendrickbrun
 * Date: 8/19/18
 * Time: 12:59 AM
 */

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;

class test
{
    public function homepage()
    {

        return new Response('HI');
            }
}