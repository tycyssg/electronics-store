package com.store.services;


import com.store.exceptions.model.EmailExistException;
import com.store.exceptions.model.UsernameExistException;
import com.store.models.User;
import com.store.models.UserPrincipal;
import com.store.repository.UserRepository;
import com.store.services.serviceInterface.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

import static com.store.constants.UserImplConstant.*;
import static com.store.enums.Role.ROLE_SUPER_ADMIN;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
    }

    @Override
    public String register(User user) throws UsernameExistException, EmailExistException {
        validateNewUsernameAndEmail(user);
        user.setUserId(generateUserId());
        // String passwordGenerated = generatePassword();
        String passwordGenerated = "tycy";
        user.setPassword(encodePassword(passwordGenerated));
        user.setJoinDate(new Date());
        user.setIsActive(true);
        user.setIsLocked(false);
        user.setRole(ROLE_SUPER_ADMIN.name());
        user.setAuthorities(ROLE_SUPER_ADMIN.getAuthorities());

        userRepository.save(user);
        return USER_SUCCESSFULLY_CREATED;
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }


    private void validateLoginAttempt(User user) {
        if (!user.getIsLocked()) {
            user.setIsLocked(loginAttemptService.hasExceededMaxAttempts(user.getUsername()));
        } else {
            loginAttemptService.evictUserFromLoginAttemptCache(user.getUsername());
        }
    }

    private void validateNewUsernameAndEmail(User user) throws UsernameExistException, EmailExistException {

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameExistException(USERNAME_ALREADY_EXISTS);
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailExistException(EMAIL_ALREADY_EXISTS);
        }

    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private String generatePassword() {
        return RandomStringUtils.randomAlphanumeric(10);
    }

    private String generateUserId() {
        return RandomStringUtils.randomNumeric(10);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(NO_USER_FOUND_BY_USERNAME + username);
        } else {
            validateLoginAttempt(user);
            Date lastLoginDate = user.getLastLoginDate();
            userRepository.updateLastLoginDate(new Date(), lastLoginDate, user.getUserId());
            return new UserPrincipal(user);
        }
    }
}
