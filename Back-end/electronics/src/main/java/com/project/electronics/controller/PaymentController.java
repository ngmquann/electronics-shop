package com.project.electronics.controller;

import com.project.electronics.dto.request.OrderRequest;
import com.project.electronics.service.impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create_payment_vnpay")
    public ResponseEntity<String> createPaymentVnPay(@RequestBody @Valid OrderRequest orderRequest, HttpServletRequest request) throws UnsupportedEncodingException {
        try {
            return ResponseEntity.ok(paymentService.createPayment(orderRequest,request));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}