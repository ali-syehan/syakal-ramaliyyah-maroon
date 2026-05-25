#!/usr/bin/env sh
# Lightweight launcher: uses installed Gradle. GitHub Actions installs Gradle 8.13.
exec gradle "$@"
