# postalbibleschool.ie

[postalbibleschool.ie](https://www.postalbibleschool.ie/) is the official website for Postal Bible School, Ireland. This repo is the source code for the website. It is built using [Laravel](https://laravel.com/) and [ReactJS](https://https://react.dev/)

<p align="center">
<a href="https://www.postalbibleschool.ie" target="_blank"><img src="https://www.postalbibleschool.ie/favicon.png" width="80" alt="Laravel Logo"></a>
</p>

## Postal Bible School

Postal Bible Schools use the resources produced by Bible Educational Services to run correspondence schools through the postal system, and to supply groups, Bible classes, schools and Sunday schools.

[postalbibleschool.com](https://www.postalbibleschool.com)

## In Ireland

Postal Bible School is a registered charity in Ireland and is closely linked with the work of BES (Bible Educational Services) which grew out of the same seed work and now connects it to other PBS centres across the world.

As a charity it aims to distribute and teach God’s word the Bible through distribution of educational resources and the hosting of events. You can find out more information on the [website](https://www.postalbibleschool.ie/about).

## Upcoming Features

- [x] Section for historical information of STEP
- [x] Filter and search in order form admin panel
- [x] Gallery interface for
  - [x] Big Bible Words
  - [x] Bible Books
- [x] PayPal integration on the website

## Website Changes

[Changelog][]

[changelog]: https://github.com/pbs-ie/laravel-server/blob/main/CHANGELOG.md

----

## Starting a local instance

For developers to start up a local instance follow the steps

### Prerequisites

- Node v20
- PHP v8.0
- Composer v2.7.1

### Installation

- Clone and install required packages in a fresh laravel environment

```shell
git clone https://github.com/pbs-ie/laravel-server.git
cd laravel-server

npm install
```

- View and edit your environment variables (API keys, end-points) in `.env`. Use the `.env.example` file to find all the valid variables.

- Install composer dependencies and run artisan commands

```shell
composer install
php artisan migrate
php artisan storage:link
```

### Run a local instance

To quickly run a local instance you can run the command `npm run dev-local`
This command runs the following commands parallelly

```shell
npm run vite
php artisan serve
memcached start
```
