package com.ssafy.jdbc.melodiket.ticket.validation;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.ticket.repository.TicketRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Slf4j
public class RefundUUIDValidator implements ConstraintValidator<ValidRefundUUID, UUID> {

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private ConcertRepository concertRepository;

    @Override
    public void initialize(ValidRefundUUID constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(UUID uuid, ConstraintValidatorContext context) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(uuid);
        if(_ticket.isEmpty()){
            context.buildConstraintViolationWithTemplate("유효한 티켓 정보가아닙니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        TicketEntity ticket = _ticket.get();

        if(ticket.getUsedAt()!=null){
            context.buildConstraintViolationWithTemplate("이미 사용한 티켓입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        Date now = new Date();
        ConcertEntity concert = ticket.getConcertEntity();

        if(now.after(concert.getStartAt())){
            context.buildConstraintViolationWithTemplate("이미 종료된 콘서트입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }

}
