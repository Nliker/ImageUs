FROM python:3.10

ADD requirements.txt /env/app/requirements.txt

WORKDIR /env/app

RUN pip install -r requirements.txt

ADD . /app

WORKDIR /app

CMD [ "gunicorn","--worker-class","gevent","--worker-connections","500","--workers","9","--bind","0.0.0.0:4000","--log-level","debug","--capture-output","--access-logfile","access.log","--error-logfile","error.log","--max-requests","500","--max-requests-jitter","500","--timeout","5","-m","007","app:create_app()"]

# command:  gunicorn --worker-class=gevent --worker-connections=1000 --workers 9 --bind 0.0.0.0:5001 --log-level=debug --capture-output --access-logfile access.log --error-logfile error.log --max-requests 1000 --max-requests-jitter 1000 --timeout 5 -m 007 app:create_app