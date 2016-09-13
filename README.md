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
    id:'userId',
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

next step you need to get implement frontend facebook login, it is easy to do with [FBConector](https://github.com/guilhermevrs/ng2-facebook) there is an example and the lib

My code example of fb login
```
  fbLogin(){
    return Observable.create((observer)=>{
      let accessToken;
      FB.login((response:any)=>{
        if (response.status === 'connected'){
          accessToken = response.authResponse.accessToken;
          return FB.api('/me','GET',(response:any)=>observer.next({login: response.name, token:accessToken, userId: response.id}))
        }
        return observer.error();
      })
    })
      .flatMap(res => this.api.post(`/fbLogin`, res))
      .map(res => res.data);
  }
```
 as you can see when you have an user, you need to send our backend `/fbLogin` an object 
 ```
 {login: 'user name', token:'fb access token', userId: 'fb user id'}
 ```
backend will check this information against facebook, and if your token is valid, you will get standard login response

```
{
  token:'JWT here',
  data:{
    id:'userId',
    login:'userLogin',
    createdAt:'',
    updatedAt:''
  }
}
```


## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
