FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /config

ADD requirements/base.txt /config/

RUN pip install -r /config/base.txt

WORKDIR /src

COPY . /src
