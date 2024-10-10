package com.ssafy.jdbc.melodiket.ticket.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = { TicketPurchaseValidator.class })
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPurchaseRequest {
    String message() default "유효하지 않은 티켓 구매 요청";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
