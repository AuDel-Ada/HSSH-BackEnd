# HEROKU & CI

## CI
There is only 1 CI, by Github Actions, to be sure that new code :
- doesn't crash installation & build
- is linted
- passes tests


STAGGING & PROD are deployed on Heroku
## STAGGING
https://house-show--back-stagging.herokuapp.com/
by manual deploy of dev branch
-> On Heroku plateform, go to app house-show--back-stagging
-> Go to deploy, at the end of the page, on manual deploy part, choose "dev"
-> Then click on "deploy branch".

## PROD
https://house-show-b.herokuapp.com/
by automatic deploy on main branch
-> Each push, if Github Action CI is ok, will deploy the new version

## ERRORS
- If any trouble, on top of the deploy Heroku page, go to "more", and check the logs ;
- You can also refer to https://devcenter.heroku.com/articles/error-codes ;
- Do not forget to check if there is any trouble on MongoDB !