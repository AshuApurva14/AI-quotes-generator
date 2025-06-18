#!/bin/bash

LOCAL_PORT=8070
CONTAINER_PORT=8080
GEMINI_API_KEY=AIzaSyA2TZpA6d78J2Moszc00sP-6GQ9bJRMUio
IMAGE_NAME=gemini-api-server

IMAGE_ID=$(docker images -q)



docker build --build-arg GEMINI_API_KEY=$GEMINI_API_KEY -t gemini-api-server .