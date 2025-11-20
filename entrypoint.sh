#!/bin/sh
set -e

# Exec the passed command, redirecting all stderr to stdout
exec "$@" 2>&1

