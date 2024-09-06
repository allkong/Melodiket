package com.ssafy.a310.bank.user.service;

import com.ssafy.a310.bank.common.exception.HttpResponseException;
import com.ssafy.a310.bank.user.service.domain.User;

public interface UserService {
    /**
     * 사용자 이름과 생년월일을 받아서 사용자 정보가 존재하는지 확인한다.
     *
     * @param name   사용자 이름
     * @param yymmdd 사용자 생년월일
     * @return 사용자 정보가 존재하는지 여부
     */
    boolean isExistUser(String name, String yymmdd);

    /**
     * 사용자 이름과 생년월일을 받아서 사용자 정보를 조회한다.
     *
     * @param name   사용자 이름
     * @param yymmdd 사용자 생년월일
     * @return 사용자 정보
     * @throws HttpResponseException 사용자 정보를 찾을 수 없는 경우 USER_NOT_FOUND(E404100)
     */
    User getUserByLoginReq(String name, String yymmdd) throws HttpResponseException;

    /**
     * 사용자 UUID를 받아서 사용자 정보를 조회한다.
     *
     * @param uuid 사용자 UUID
     * @return 사용자 정보
     * @throws HttpResponseException 사용자 정보를 찾을 수 없는 경우 ErrorDetail#USER_NOT_FOUND(E404100)
     */
    User getUserByUuid(String uuid) throws HttpResponseException;

    /**
     * 사용자 이름과 생년월일을 받아서 새 사용자 정보를 생성한다.
     *
     * @param name   사용자 이름
     * @param yymmdd 사용자 생년월일
     * @throws HttpResponseException 이미 사용 중인 이름, 생년월일 조합인 경우 ErrorDetail#ALREADY_EXIST_USER(E409100)
     */
    void createUser(String name, String yymmdd) throws HttpResponseException;

    /**
     * 사용자 이름이 사용 가능한지 확인한다.
     *
     * @param name 사용자 이름
     * @return 사용자 이름 사용 가능 여부
     */
    boolean isAvailableName(String name);

    /**
     * 시스템 사용자를 생성한다.
     *
     * @return 시스템 사용자
     */
    User createSystemUser();

    /**
     * 시스템 사용자를 조회한다.
     *
     * @return 시스템 사용자
     */
    User getSystemUser();
}
