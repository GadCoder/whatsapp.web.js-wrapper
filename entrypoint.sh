#!/bin/sh
set -e

AUTH_DIR="/usr/src/app/.wwebjs_auth/session"

# Only run Puppeteer-related cleanup if executable path is set
if [ -n "$PUPPETEER_EXECUTABLE_PATH" ]; then
  echo "Cleaning up Chromium SingletonLock in $AUTH_DIR..."
  find "$AUTH_DIR" -name "SingletonLock" -delete || true
fi

echo "Running command: $@"
exec "$@"
