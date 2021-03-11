package com.store.repository;


import com.store.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findUserByUsername(String username);

    User findUserByEmail(String email);

    @Modifying
    @Transactional
    @Query("update User u set u.lastLoginDate = ?1, u.lastLoginDateDisplay = ?2 where u.userId = ?3")
    int updateLastLoginDate(Date lastLoginDate, Date lastLoginDateDisplay, String userId);
}
