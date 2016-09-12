#Deployment

1. create [heroku](https://www.heroku.com/) account
2. create application in your account
3. open application settings, you should be able to see heroku Git URL
4. press Reveal Config Vars and add your variables from .env file, except port
5. download [heroku toolbelt](https://devcenter.heroku.com/articles/heroku-command-line) and set it up
6. open command line type `heroku login`, enter your credentials
7. now you can commit and push this project to heroku, and it should be available on the heroku domain <your app name>.heroku.com

## commit and push
1. in the project directory add remote repository `git remote add heroku https://git.heroku.com/<app name>.git`
2. push it to heroku `git push heroku master`
