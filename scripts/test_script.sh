#!/bin/bash



curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "parts":[{"text": "Generate a list of 10 unique and creative names for a new type of fruit that is a cross between an apple and a banana. The names should be catchy and appealing to consumers."}],
    }]
   }'