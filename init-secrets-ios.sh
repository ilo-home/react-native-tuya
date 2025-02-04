#!/bin/bash
# Adds Tuya secrets as macros for iOS

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
placeholder_key="THING_SMART_APPKEY_PLACEHOLDER"
placeholder_secret="THING_SMART_SECRET_PLACEHOLDER"
replacement_key="THING_SMART_APPKEY=$APP_KEY"
replacement_secret="THING_SMART_SECRET=$APP_SECRET"

# Check if the secrets are already defined in the project.pbxproj file
if grep -q "$replacement_key" "$pbxproj_file" && grep -q "$replacement_secret" "$pbxproj_file"; then
    echo "Both app secrets are already defined. No changes made."
elif ! grep -q "$replacement_key" "$pbxproj_file" && ! grep -q "$replacement_secret" "$pbxproj_file"; then
    # Replace both placeholders with the actual app secrets
    sed -i.bak "s/$placeholder_key/$APP_KEY/g" "$pbxproj_file"
    sed -i.bak "s/$placeholder_secret/$APP_SECRET/g" "$pbxproj_file"
    echo "Both app secrets have been added."
elif ! grep -q "$replacement_key" "$pbxproj_file"; then
    # Replace the placeholder for the app key
    sed -i.bak "s/$placeholder_key/$APP_KEY/g" "$pbxproj_file"
    echo "App key has been added."
elif ! grep -q "$replacement_secret" "$pbxproj_file"; then
    # Replace the placeholder for the app secret
    sed -i.bak "s/$placeholder_secret/$APP_SECRET/g" "$pbxproj_file"
    echo "App secret has been added."
fi
