#!/usr/bin/env bash

set -e

echo "====== Let's build a docker image ====="

docker build --secrets id=gemini_key,src=gemini_api_key.txt -t test-app .