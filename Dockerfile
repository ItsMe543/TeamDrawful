# pull official base image
FROM python:3.9.6-alpine

# set work directory
WORKDIR /home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip3 install --upgrade pip
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt

# install python packages
RUN pip3 install django-cors-headers
RUN pip3 install djangorestframework

# copy entrypoint.sh
#COPY ./app/entrypoint.sh .
#RUN sed -i 's/\r$//g' ./entrypoint.sh
#RUN chmod +x ./entrypoint.sh

# copy project
COPY . .

# start gunicorn server
#CMD gunicorn -b 0.0.0.0:8000 --worker-class=gevent --worker-connections=1000 --workers=5 team40-22.wsgi

# run entrypoint.sh
ENTRYPOINT ["npm", "start"]