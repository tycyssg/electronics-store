package com.store.services.serviceInterface;


import com.store.exceptions.model.EmailExistException;
import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.UsernameExistException;
import com.store.models.User;

public interface UserService {

    String register(User user) throws UsernameExistException, EmailExistException;

    User findUserByUsername(String username);

    User findUserByEmail(String email);

    void updateUser(User user) throws InvalidDataFormatException, ExistException;
}
