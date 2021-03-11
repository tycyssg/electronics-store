package com.store.exceptions.model;

public class InvalidDataFormatException extends Exception {

    public InvalidDataFormatException() {
    }

    public InvalidDataFormatException(String message) {
        super(message);
    }
}
