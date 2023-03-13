########## Stage 1 - Django ##########
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
# copy project
COPY . .

########## Stage 2 - React ##########
FROM node:current-alpine3.16 AS builder
WORKDIR /home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend/ ./
RUN npm run build

########## Stage 3 - Nginx ##########
FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22/frontend/build /usr/share/nginx/html
COPY conf /etc/nginx
VOLUME /etc/nginx
VOLUME /usr/share/nginx/html
#COPY --from=builder /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#RUN nginx -s reload
#CMD ["nginx", "-g", "daemon off;"]
