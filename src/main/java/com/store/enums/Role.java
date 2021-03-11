package com.store.enums;


import com.store.models.Authority;

import java.util.List;
import java.util.stream.Collectors;

import static com.store.constants.Authority.*;
import static java.util.Arrays.stream;

public enum Role {

    ROLE_USER(USER_AUTHORITIES),
    ROLE_MANAGER(MANAGER_AUTHORITIES),
    ROLE_DEVELOPER(DEVELOPER_AUTHORITIES),
    ROLE_ADMIN(ADMIN_AUTHORITIES),
    ROLE_SUPER_ADMIN(SUPER_ADMIN_AUTHORITIES);

    private final List<Authority> authorities;

    Role(String... authorities) {
        this.authorities = stream(authorities).map(Authority::new).collect(Collectors.toList());
    }

    public List<Authority> getAuthorities() {
        return authorities;
    }
}
