package com.project.electronics.service;

import com.project.electronics.dto.request.OrderRequest;
import jakarta.servlet.http.HttpServletRequest;

public interface IPaymentService {
    String createPayment(OrderRequest orderRequest, HttpServletRequest request)  throws Exception;
//    void bookTicket(TicketBookingRequest ticketRequest, Long id, Float vnp_Amount) throws  Exception;
}
