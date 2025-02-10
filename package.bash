#!/bin/bash

# Set variables
VERSION="0.2.2" # Change this to your versioning logic
OUTPUT_DIR="packages"
ZIP_NAME="one-home-$VERSION.zip"
FILES_TO_ZIP=("public" "assets" "manifest.json" "index.html")

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Zip the selected files and folders
zip -r "$OUTPUT_DIR/$ZIP_NAME" "${FILES_TO_ZIP[@]}"

echo "Archive created at $OUTPUT_DIR/$ZIP_NAME"
