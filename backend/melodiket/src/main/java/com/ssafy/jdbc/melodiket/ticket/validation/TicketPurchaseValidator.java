package com.ssafy.jdbc.melodiket.ticket.validation;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertSeatEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.wallet.entity.WalletInfoEntity;
import com.ssafy.jdbc.melodiket.wallet.repository.WalletInfoRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Slf4j
public class TicketPurchaseValidator implements ConstraintValidator<ValidPurchaseRequest, TicketPurchaseRequest> {

    @Autowired
    private ConcertRepository concertRepository;

    @Override
    public void initialize(ValidPurchaseRequest constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(TicketPurchaseRequest ticketPurchaseRequest, ConstraintValidatorContext context) {
        Optional<ConcertEntity> optionalConcert = concertRepository.findByUuid(ticketPurchaseRequest.getConcertId());
        context.disableDefaultConstraintViolation();

        log.info(SecurityContextHolder.getContext().getAuthentication().toString());
        AppUserEntity user = (AppUserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(optionalConcert.isEmpty()) {
            context.buildConstraintViolationWithTemplate("존재하지 않은 콘서트입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        LocalDateTime now = LocalDateTime.now();
        ConcertEntity concert = optionalConcert.get();

        if(now.isAfter(concert.getStartAt())){
            context.buildConstraintViolationWithTemplate("이미 종료된 콘서트입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        if(now.isBefore(concert.getTicketingAt())){
            context.buildConstraintViolationWithTemplate("티케팅 시작 전입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        WalletInfoEntity wallet = user.getWalletInfo();
        if(wallet.getTokenAmount() < concert.getTicketPrice()){
            context.buildConstraintViolationWithTemplate("토큰 잔액이 부족합니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        if(concert.getAvailableTickets()<1){
            context.buildConstraintViolationWithTemplate("콘서트가 매진되었습니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        if(concert.getConcertSeats().contains(
                new ConcertSeatEntity(null, ticketPurchaseRequest.getSeatRow(), ticketPurchaseRequest.getSeatRow(), null)
        ))
        {
            context.buildConstraintViolationWithTemplate("이미 구매된 좌석입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
