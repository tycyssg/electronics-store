package com.store.constants;

public class SecurityConstants {

    public static final long EXPIRATION_TIME = 36000000; //10h in milliseconds
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified. Please login again!";
    public static final String ISSUER = "QALITY.TECH";
    public static final String STORE_ADMINISTRATION = "Wrapper Ui";
    public static final String AUTHORITIES = "authorities";
    public static final String FORBIDDEN_MESSAGE = "You need to log in to access this page";
    public static final String ACCESS_DENIED = "You do not have permission to access this page";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    public static final String[] PUBLIC_URLS = {"/api/login", "/api/register"};
}



