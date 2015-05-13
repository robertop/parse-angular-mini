Parse Angular Mini App
----------------------
This is a small angular app that uses parse for user authentication.
The app is meant to be deployed to a parse sub-domain.

Pre-requisites
--------------
* npm
* bower
* wget
* Parse command line tools

On Mac OS X, use homebrew to install NPM, and install bower globally.

``
brew install npm
brew install wget
npm install -g bower
wget https://www.parse.com/downloads/cloud_code/installer.sh
sh installer.sh
``

After NPM and bower have been installed, download the project's
requirements (angular, parse).

``
npm install
bower install
``

Next, edit app/config.js and fill in your parse app's app ID
and javascript key.

Then, edit config/global.json and fill in your parse app's
name, app ID, and master key.

Do not check in changes to app/config.js or config/global.json.
They are already ignored by Git.

Local development:
-----------------

``
npm start
``

Then browse to http://localhost:3000/app/

Pushing to production:
---------------------
``
npm run deploy
``

This command will build optimized JS and deploy the app
to a parse subdomain using the parse command line tool.