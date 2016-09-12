# api

## About

a [Sails](http://sailsjs.org) application

## Getting Started

Getting up and running is as easy as 1, 2, 3....

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/api-bootcamp; npm install
    ```
3. Install [node foreman](https://github.com/strongloop/node-foreman) globally

    ```
    npm install -g foreman
    ```
4. Full fill .env file, set MONGOURL, you may create account on [mlab.com](https://mlab.com/), it is free. Url should be like `mongodb://<user name>:<password>@<db host url>:db host port/<db name>`
5. Start your app

    ```
    nf start
    ```

##Methods
1. `/signin` requires `login` and `password`, will check against db and if user there, will return object with JWT and user data
```
{
  token:'JWT here',
  data:{
    _id:'userId',
    login:'userLogin',
    createdAt:'',
    updatedAt:''
  }
}
```
2. `/signup` accepts `login`, `password`, `confirmation` returns same response as `/signin`
3. in order to get access to other methods will should add this JWT token to requests headers
```
{Authorization: `Bearer ${jwt}`}
```
## What next

* write courses api

Cannot promise backward compatibility, so be ready to drop your DB and fill it again

FYI I am lazy person, and do not promise to do anything in time, I do it only for myself and if it could help for some of you, you can always say Thanks, but the best thanks is PR with something useful!

## Facebook auth

to be able `signup/signin` with facebook profile, you need to create facebook app, add facebook login to the app, make it public, get facebook app id and secret key and add them to .env file.

first request should be to `http(s)://your domain name(localhost:3030)/auth/facebook` this request will be redirected to facebook, after that facebok should redirect you back to the app, please set calback url to `http(s)://your domain name(localhost:3030)/auth/facebook/callback`

your login will be `firstName + ' ' + secondName`

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
