# Chesapeake Monitoring Cooperative

## App

The visualization app is built with [Dash](https://plot.ly/products/dash/). To run the app locally, you will need to clone the repository and install the required modules. 
```
git clone https://github.com/DataKind-DC/CMC
cd CMC
pip3 install -r requirements.txt
```

Start the app with:

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


