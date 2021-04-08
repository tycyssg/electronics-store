package com.store.enums;


import com.store.models.Authority;

import java.util.List;
import java.util.stream.Collectors;

import static com.store.constants.Authority.SUPER_ADMIN_AUTHORITIES;
import static com.store.constants.Authority.USER_AUTHORITIES;
import static java.util.Arrays.stream;

public enum Role {
    ROLE_USER(USER_AUTHORITIES),
    ROLE_SUPER_ADMIN(SUPER_ADMIN_AUTHORITIES);

    private List<Authority> authorities;


    Role(String... authorities) {
        this.authorities = stream(authorities).map(a -> new Authority(null, a)).collect(Collectors.toList());
    }

    public List<Authority> getAuthorities() {
        return authorities;
    }
}
