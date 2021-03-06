package com.store.repository;


import com.store.models.User;
import com.store.selectInterfaces.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUserId(String userId);

    boolean existsByPhoneNoAndUserIdNot(String phoneNo, String userId);

    boolean existsByUsernameAndUserIdNot(String username, String userId);

    boolean existsByEmailAndUserIdNot(String email, String userId);

    User findUserByUsername(String username);

    User findUserByEmail(String email);

    Optional<UserDetails> findUserDetailsByUserId(String userId);

    @Modifying
    @Transactional
    @Query("update User u set u.lastLoginDate = ?1, u.lastLoginDateDisplay = ?2 where u.userId = ?3")
    int updateLastLoginDate(Date lastLoginDate, Date lastLoginDateDisplay, String userId);

    @Modifying
    @Transactional
    @Query("update User u set u.username = ?1, u.email = ?2, u.phoneNo = ?3 where u.userId = ?4")
    int updateUserDetails(String username, String email, String phoneNo, String userId);
}
