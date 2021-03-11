# electronics-store

Electronics Store with Spring boot and Angular

**Project Requirements**

1. Postgres SQL: Install link [Here](https://www.postgresql.org/download/ "PostgreSQL Downloads")
2. Create a database called: "electronics-store"
3. For Intellij ID only (add this row in Configuration > Environment Variables)

* SPRING_DATASOURCE_URL=jdbc:postgresql://127.0.0.1:
  5432/electronics-store?useUnicode=true&useLegacyDatetimeCode=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false;SPRING_DATASOURCE_USERNAME=dbUsername;SPRING_DATASOURCE_PASSWORD=dbPassword

4. For others IDE's go in **electronics-store/src/main/resources/application.yml** and change.

* url: ${SPRING_DATASOURCE_URL}
* password: ${SPRING_DATASOURCE_PASSWORD}
* username: ${SPRING_DATASOURCE_USERNAME}

**TO**

* url: jdbc:postgresql://127.0.0.1:
  5432/electronics-store?useUnicode=true&useLegacyDatetimeCode=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false
* password: dbPassword
* username: dbUsername

5. Node JS: Install link [Here](https://nodejs.org/en/download/ "NodeJS Downloads")


