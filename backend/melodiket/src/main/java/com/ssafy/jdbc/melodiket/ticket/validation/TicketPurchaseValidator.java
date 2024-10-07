package com.ssafy.jdbc.melodiket.ticket.validation;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertSeatEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

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

        if (optionalConcert.isEmpty()) {
            context.buildConstraintViolationWithTemplate("존재하지 않은 콘서트입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        LocalDateTime now = LocalDateTime.now();
        ConcertEntity concert = optionalConcert.get();

        if (now.isAfter(concert.getStartAt())) {
            context.buildConstraintViolationWithTemplate("이미 종료된 콘서트입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        if (now.isBefore(concert.getTicketingAt())) {
            context.buildConstraintViolationWithTemplate("티케팅 시작 전입니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        if (concert.getAvailableTickets() < 1) {
            context.buildConstraintViolationWithTemplate("콘서트가 매진되었습니다.")
                    .addPropertyNode("info")
                    .addConstraintViolation();
            return false;
        }

        if (!concert.getStageEntity().getIsStanding()) {
            Set<ConcertSeatEntity> seats = concert.getConcertSeats();
            for (ConcertSeatEntity seat : seats) {
                if (seat.getSeatRow().equals(ticketPurchaseRequest.getSeatRow()) && seat.getSeatCol().equals(ticketPurchaseRequest.getSeatCol())) {
                    context.buildConstraintViolationWithTemplate("이미 구매된 좌석입니다.")
                            .addPropertyNode("info")
                            .addConstraintViolation();
                    return false;
                }
            }
        }

        return true;
    }
}
