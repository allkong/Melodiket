package com.ssafy.a310.bank.common.controller.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

public @Repeatable(Conditional.List.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {
        ConditionalValidation.class
}) @interface Conditional {

    String message();

    Class<?>[] groups() default {};

    //조건부 대상이 되는 필드명
    String selected();

    //조건부 대상이 요구되는 값
    String[] values();

    //값이 존재해야 하는 필드명
    String[] required();

    Class<? extends Payload>[] payload() default {};


    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {
        Conditional[] value();
    }
}
