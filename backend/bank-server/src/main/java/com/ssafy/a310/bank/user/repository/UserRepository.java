package com.ssafy.a310.bank.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    boolean existsByNameAndYymmdd(String name, String yymmdd);

    boolean existsByUuid(String uuid);

    Optional<UserEntity> findByNameAndYymmdd(String name, String yymmdd);

    Optional<UserEntity> findByUuid(String uuid);
}
