package com.store.exceptions.model;

public class EmailExistException extends Exception {
    public EmailExistException(String message) {
        super(message);
    }
}
