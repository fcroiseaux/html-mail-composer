html-mail-composer
==================

Simple html editor that verifes the compatibility of an html portion of code with email clients and returns:

* a version of the html code compatible with email clients
* a plain text version
* eventually the list of warnings

in a json structure

    {
       "html": "the correct html version",
       "plain_text": "the plain text version",
       "warnings": ["first warning", "second warning"]
    }
    
The server side uses [sinatra](http://www.sinatrarb.com/) and [premailer](https://github.com/premailer/premailer/)
##Installation
###Install RDOC
    gem install rdoc
###Install Sinatra
    gem install sinatra
###Install premailer
    gem install premailer
##Start program
    ruby prem.rb

Connect to [http://localhost:4567/mailer.html](http://localhost:4567/mailer.html)

