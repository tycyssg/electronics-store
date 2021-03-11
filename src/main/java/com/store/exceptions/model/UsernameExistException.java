package com.store.exceptions.model;

public class UsernameExistException extends Exception {
    public UsernameExistException(String message) {
        super(message);
    }
}
