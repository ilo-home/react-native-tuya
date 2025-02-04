#!/bin/bash
# Removes Tuya secrets and replaces them with placeholders for iOS
# Assumes secrets match those defined in .env

# Load environment variables from .env file located at the root
if [ -f .env ]; then
    source .env
else
    echo ".env file not found!"
    exit 1
fi

# Declare Tuya secrets, setting default values as empty string
APP_KEY=${THING_SMART_APPKEY_IOS:-""}
APP_SECRET=${THING_SMART_SECRET_IOS:-""}

# Check if the app secrets are the default values (empty strings)
if [ -z "$APP_KEY" ] || [ -z "$APP_SECRET" ]; then
    echo "App secrets are not properly set. Please set them in an .env file."
    exit 1
fi

# Define the path to the project.pbxproj file
pbxproj_file="ios/RNTuyaSdk.xcodeproj/project.pbxproj"

# Define the placeholders and replacement strings
placeholder_key=${THING_SMART_APPKEY_PLACEHOLDER:-""}
placeholder_secret=${THING_SMART_SECRET_PLACEHOLDER:-""}

# Check if the placeholders are the default values (empty strings)
if [ -z "$placeholder_key" ] || [ -z "$placeholder_secret" ]; then
    echo "Placeholders are not properly set. Please set them in an .env file."
    exit 1
fi

# Check if the placeholders are already present in the project.pbxproj file
if grep -q "$placeholder_key" "$pbxproj_file" && grep -q "$placeholder_secret" "$pbxproj_file"; then
    echo "Both placeholders are already present. No changes made."
elif ! grep -q "$placeholder_key" "$pbxproj_file" && ! grep -q "$placeholder_secret" "$pbxproj_file"; then
    # Replace both app secrets with placeholders
    sed -i.bak "s/$APP_KEY/$placeholder_key/g" "$pbxproj_file"
    sed -i.bak "s/$APP_SECRET/$placeholder_secret/g" "$pbxproj_file"
    echo "Both app secrets have been removed."
elif ! grep -q "$placeholder_key" "$pbxproj_file"; then
    # Replace the placeholder for the app key
    sed -i.bak "s/$APP_KEY/$placeholder_key/g" "$pbxproj_file"
    echo "App key has been removed."
elif ! grep -q "$placeholder_secret" "$pbxproj_file"; then
    # Replace the placeholder for the app secret
    sed -i.bak "s/$APP_SECRET/$placeholder_secret/g" "$pbxproj_file"
    echo "App secret has been removed."
fi