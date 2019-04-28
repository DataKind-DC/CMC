# Chesapeake Monitoring Cooperative

## App

The visualization app is built with [Dash](https://plot.ly/products/dash/). Start the app with:

```
python app.py
```

To deploy the app to Heroku, first install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). Then, login, create your project, and deploy.

```
heroku login
heroku create cmc-data-explorer
heroku git:remote -a cmc-data-explorer
git push heroku master
```


