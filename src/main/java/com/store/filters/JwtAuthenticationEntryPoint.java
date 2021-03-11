package com.store.filters;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.models.HttpCustomResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

import static com.store.constants.SecurityConstants.FORBIDDEN_MESSAGE;
import static com.store.constants.SecurityConstants.TOKEN_CANNOT_BE_VERIFIED;


@Component
public class JwtAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        HttpCustomResponse httpCustomResponse;

        if (exception.getLocalizedMessage().equalsIgnoreCase("full authentication is required to access this resource")) {
            httpCustomResponse = new HttpCustomResponse(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED, HttpStatus.UNAUTHORIZED.getReasonPhrase().toUpperCase(), TOKEN_CANNOT_BE_VERIFIED);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        } else {
            httpCustomResponse = new HttpCustomResponse(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN.getReasonPhrase().toUpperCase(), FORBIDDEN_MESSAGE);
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        OutputStream outputStream = response.getOutputStream();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(outputStream, httpCustomResponse);
        outputStream.flush();

    }
}
