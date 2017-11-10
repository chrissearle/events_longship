#!/bin/bash

cd frontend && rm -rf build && yarn build
docker-compose build
