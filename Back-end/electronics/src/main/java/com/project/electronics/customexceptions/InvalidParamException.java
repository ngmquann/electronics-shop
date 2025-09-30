package com.project.electronics.customexceptions;

public class InvalidParamException extends Exception{
    public InvalidParamException(String message) {
        super(message);
    }
}