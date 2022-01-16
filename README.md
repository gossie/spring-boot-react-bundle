# spring-boot-react-bundle

This is a demo project that shows how it is possible to deploy a react frontend and a Spring Boot backend into a heroku dyno. The following paragraphs describe the actions you need to perform.

## Creating an heroku app
When creating the heroku app I recommend to use the heroku cli. Use the following commands to create the app and add the required buildpack.
* `heroku create <your-app-name>`
* `heroku buildpacks:set heroku/java --app=<your-app-name>`

## Project structure

The project consists of to sub projects. The react project is located in the frontend directory and the Spring Boot project in the backend directory. To let heroku know that the main project is the Spring Boot project, there is a parent pom.xml in the root directory. That way, when heroku builds checks out the code and starts the build the parent pom and the backend module are built.<br />
To let heroku know that the jar file is now in the target directory of the backend, the `Procfile` is needed.

## Bundling the frontend into the backend jar

The frontend project is built using the `com.github.eirslett:frontend-maven-plugin`. The `maven-resources-plugin` is used to copy the content of the resulting `build` directory to the backend's `target/classes/static` directory.<br />

## Deployment to heroku

Just connect your heroku app and yout GitHub repository on the heroku app's "Deploy"-tab.
