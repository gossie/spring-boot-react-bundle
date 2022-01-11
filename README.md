# nf-with-frontend

This is a demo project that shows how it is possible to deploy a react frontend and a Spring Boot backend into a heroku dyno. The following paragraphs describe the actions you need to perform.

## Creating an heroku app
When creating the heroku app I recommend to use the heroku cli. Use the following commands to create the app and add the required buildpacks.
* `heroku create <your-app-name>`
* `heroku buildpacks:set heroku/java --app=<your-app-name>`
* `heroku buildpacks:add --index 1  heroku/nodejs --app=<your-app-name>`

It is important that the java buildpack, the one for the app that is actually running in the heroku dyno, is the last buildpack. Also, to make sure that the nodejs buildpack is really installed, there needs to be an empty package.json in the root directory of your project.

## Project structure

The project consists of to sub projects. The react project is located in the frontend directory and the Spring Boot project in the backend directory. To let heroku know that the main project is the Spring Boot project, there is a parent pom.xml in the root directory. That way, when heroku builds checks out the code and starts the build the parent pom and the backend module are built.

## Bundling the frontend into the backend jar

The `build-frontend.sh` is a script that builds the frontend using npm (installed thanks to the nodejs buildpack) and copies the content of the resulting `build` directory to the backend's `target/classes/static` directory. The script ist executed by the `exec-maven-plugin` that is included in the backend's `pom.xml`.<br />
