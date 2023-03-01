# pull official base image
FROM python:3.9.6-alpine

# set work directory
WORKDIR /team40-22

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip3 install --upgrade pip
COPY ./app/requirements.txt .
RUN pip3 install -r requirements.txt

# copy entrypoint.sh
COPY ./app/entrypoint.sh .
RUN sed -i 's/\r$//g' ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/team40-22/entrypoint.sh"]