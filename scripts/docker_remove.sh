#!/usr/bin/env bash

set -e

CONTAINER_RUNNING=$(docker ps -aq)

docker rmi -f $(docker images -q)

docker system prune -f
