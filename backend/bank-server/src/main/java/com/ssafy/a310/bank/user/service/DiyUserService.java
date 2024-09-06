package com.ssafy.a310.bank.user.service;

import com.ssafy.a310.bank.common.exception.ErrorDetail;
import com.ssafy.a310.bank.common.exception.HttpResponseException;
import com.ssafy.a310.bank.user.repository.UserEntity;
import com.ssafy.a310.bank.user.repository.UserRepository;
import com.ssafy.a310.bank.user.service.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class DiyUserService implements UserService {
    private final UserRepository userRepository;

    public boolean isExistUser(String name, String yymmdd) {
        return userRepository.existsByNameAndYymmdd(name, yymmdd);
    }

    @Override
    public User getUserByLoginReq(String name, String yymmdd) {
        UserEntity entity = userRepository.findByNameAndYymmdd(name, yymmdd)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        return new User(entity);
    }

    @Override
    public User getUserByUuid(String uuid) {
        UserEntity entity = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        return new User(entity);
    }

    @Override
    public void createUser(String name, String yymmdd) {
        if (isExistUser(name, yymmdd)) {
            throw new HttpResponseException(ErrorDetail.ALREADY_EXIST_USER);
        }

        UserEntity entity = UserEntity.builder()
                .name(name)
                .yymmdd(yymmdd)
                .build();
        userRepository.save(entity);
        log.info(entity.toString());
    }
}
