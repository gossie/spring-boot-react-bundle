FROM openjdk:18

ENV ENVIRONMENT=prod

LABEL NicolaiKopka="nicolai.kopka@googlemail.com"

ADD target/spring-boot-react-bundle-backend-0.0.1-SNAPSHOT.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]