package com.ssafy.jdbc.melodiket.ticket.validation;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

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
        if(optionalConcert.isEmpty()) {
            context.buildConstraintViolationWithTemplate("존재하지 않은 콘서트입니다.")
                    .addPropertyNode("concertId")
                    .addConstraintViolation();
            return false;
        }

        Date now = new Date();
        ConcertEntity concert = optionalConcert.get();

        if(now.before(concert.getTicketingAt())){
            context.buildConstraintViolationWithTemplate("티케팅 시작 전입니다.")
                    .addPropertyNode("aa")
                    .addConstraintViolation();
            return false;
        }

        if(now.after(concert.getStartAt())){
            context.buildConstraintViolationWithTemplate("이미 종료된 콘서트입니다.")
                    .addPropertyNode("aa")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
