#!/usr/bin/env sh

# abort on errors
set -e

# build
echo "Building for production..."
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b gh-pages
git add -A
git commit -m 'Deploy to GitHub Pages'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git gh-pages

echo "Build complete! Now run:"
echo "cd dist"
echo "git push -f git@github.com:YOUR_USERNAME/YOUR_REPO.git gh-pages"

cd -
