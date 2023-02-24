FROM ubuntu:latest
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    python3-pip 
RUN pip3 install django djangorestframework tzdata
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
WORKDIR /app
COPY . /app
EXPOSE 8000
ENTRYPOINT ["python3"]
CMD  ["manage.py", "runserver","0.0.0.0:8000"]
