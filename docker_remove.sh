#!/usr/bin/env bash

if 
docker rm -f $(docker ps -aq)

docker rmi -f $(docker images -q)

docker system prune -f
