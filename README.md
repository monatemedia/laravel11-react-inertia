<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Set Up on Shared Hosting As a Subdomain with Github Actions and CI/CD Pipelines

### Resources

-   The Codeholic [Laravel Hosting with Github Actions - Part 45 | Laravel Social Media Website](https://www.youtube.com/watch?v=mBdzv4-PMtQ&t=21s)
-   The Codeholic [How to Deploy Laravel on Shared Hosting in 12 minutes](https://www.youtube.com/watch?v=dpJDV25tptw&t=621s)
-   Traversy Media [Deploy Laravel To Shared Hosting The Easy Way](https://www.youtube.com/watch?v=6g8G3YQtQt4)

## Linux Terminal Cheat Sheet

-   List directory `ls -ln`
-   Remove file `rm -rf filename`

## Prerequisites

These things must be done before you can deploy your application

### Laravel Error: Build the production assets `run npm build`

1. If your vite server hasn't been built, go back to your application in your code editor on your local machine
2. At your local terminal where you would/may have Vite running, end any running sessions and type `npm run build` to build your assets for production. A folder called 'build' will be created in your public folder.
3. Go to your .gitignore file in your code editor and delete these lines `/public/build`
4. In your local terminal push your changes to your github repository.

### Create subdirectory

1. Create the subdomain through your cPanel
2. Enter into your File Manager, find the subdirectory and rename it to subdirectory.old

### SSH into Terminal

3. Navigate to public_html with `cd public_html`
4. Clone your Git project into this directory with `git clone git@github.com:monatemedia/laravel11-react-inertia.git`
5. Enter your newly cloned directory with `cd laravel11-react-inertia`
6. Create an env file using `cp .env.example .env`
7. Open the newly created file with vim `vim .env`
8. When vim opens, hit 'i' on your keyboard to enter into INSERT mode
9. Update the following information:

-   APP_NAME="Application Name" to change the application name
-   APP_ENV=prod to change the environment from local development to production
-   APP_DEBUG=false if you don't want app errors to be shown, it can be left as `true` to debug errors
-   APP_URL=https://subdomain.yourdomain.com/

### Create Database

10. Go back to your control panel and find databases
11. Create database with a database name, user name and password. Make sure to save this information
12. Create your database with the Create button

### Save Database Credentials into .env file

12. Go back to your terminal and enter in the:

-   DB_CONNECTION=mysql
-   DB_HOST=127.0.0.1
-   DB_PORT=3306
-   DB_DATABASE=hostingusername_databasename
-   DB_USERNAME=hostingusername_username
-   DB_PASSWORD=password

13. Hit the ESC key followed by `:wq` to write to the file and quit

### Check Composer Version

14. Check composer version with `composer --version`
15. If composer version is version 1.x you'll have to download version 2.x of composer

### Download Composer Version 2.x

16. Visit https://getcomposer.org/download/
17. Copy all the commands from the section "Command-line installation"

-   `php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"`

18. Check that composer has successfulle downloaded into your file with `ls -la`
19. Execute `php composer.phar` which should give you the working php composer version

### Install Composer Version 2.x

20. Run command `php composer.phar install`
21. Your composer should now install without errors

### Generate Application Key with Artisan

22. Execute `php artisan key:generate --ansi`
23. The terminal should confirm with INFO: Application key set successfullly

### Run Migrations

24. Execute `php artisan migrate` to run migrate to run migrations or `php artisan migrate:refresh` to refresh migrations and reset the application.
25. The terminal should confirm that the migrations have been run

### Create Symbolic Link to Subdomain

26. Go back up one directory out of your project folder into public_html by executing command `cd ../`
27. Run command `ls -la` to check what files are in the folder. You should see subdomainname.old that you had created earlier.
28. Run command `ln -s path/to/laravel/public subdomainname`. Do not include .old in the name
29. Run `ls -la` and your link should show up correctly
30. Go test your site in the browser at subdomain.yourdomainname.com and it should now be working!

### Create Symbolic Link to Storage Folder

31. Go back into your project folder like so `cd laravel11-react-inertia`
32. Execute `php artisan storage:link` and the terminal should respond with INFO: The [public/storage] link has connected to [storage/app/public]

### Clearing Cache (Optional)

33. Run `php artisan route:cache`
34. Run `php artisan cache:clear`
35. Run `php artisan config:cache`
36. Run `php artisan view:clear`
37. Run `php artisan optimize`

## Connect SMTP

If your application requires user authentication by email, you must set up SMTP.

### Register First User

1. visit your site at `subdomain.yourdomainname.com/register` and register a new user. If you have authenication turned on, your app will have attempted to send you an email, but failed because SMTP is not yet configured.
2. In your cPanel, search for databases and phpMyAdmin into your database
3. In your database, select `users`. You should find your first user's data there.
4. Select `Edit` in line with the user's name
5. When the Edit form appears, in the Email Verified At section, use the date picker to select today's date. Scroll to the bottom of the page and select `Go` to run the query
6. go back to your site at `subdomain.yourdomainname.com/login` and log into the account you created

## Connecting the CI/CD pipes

You have now successfully uploaded your project to shared hosting with Github. If you are looking to connect your Github with your app on the shared hosting account with continuous integration and continuous delivery/deployment (CI/CD) so that when code is pushed to the main branch of your Github repository, the application will be built and uploaded on your production server... then read on.

Reference article: [How to Create CI/CD Pipeline for Your Laravel Project With Github Actions](https://redberry.international/creating-ci-cd-pipeline-for-laravel-project/)

### Prevent `run npm build` build folder being pushed

1. Go to your .gitignore file in your code editor on your local machine and insert these lines `/public/build` to prevent your local build folder being pushed. The build folder will be created by Github's Node runner.

### Insert Public Key Into Project

1. Change directories into your root directory with command `cd ~/`
2. Execute `ssh-keygen`

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).
-   [Powerful dependency injection container](https://laravel.com/docs/container).
-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).
-   [Robust background job processing](https://laravel.com/docs/queues).
-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

-   **[Vehikl](https://vehikl.com/)**
-   **[Tighten Co.](https://tighten.co)**
-   **[WebReinvent](https://webreinvent.com/)**
-   **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
-   **[64 Robots](https://64robots.com)**
-   **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
-   **[Cyber-Duck](https://cyber-duck.co.uk)**
-   **[DevSquad](https://devsquad.com/hire-laravel-developers)**
-   **[Jump24](https://jump24.co.uk)**
-   **[Redberry](https://redberry.international/laravel/)**
-   **[Active Logic](https://activelogic.com)**
-   **[byte5](https://byte5.de)**
-   **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
