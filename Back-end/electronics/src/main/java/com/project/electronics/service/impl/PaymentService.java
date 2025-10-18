package com.project.electronics.service.impl;


import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.config.ConfigVNPay;
import com.project.electronics.dto.request.OrderRequest;
import com.project.electronics.models.OrderEntity;
import com.project.electronics.models.UserEntity;
import com.project.electronics.repository.OrderRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.service.IPaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.project.electronics.config.ConfigVNPay.vnp_Command;
import static com.project.electronics.config.ConfigVNPay.vnp_Version;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService implements IPaymentService {
    private final  HttpServletRequest request;
    private final  UserRepository  userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final OrderRepository orderRepository;

    @Override
    public String createPayment(OrderRequest orderRequest,HttpServletRequest request) throws Exception{
        UserEntity user = resolveUserFromRequest(request );
        OrderEntity order = orderRepository.findFirstByUserIdAndStatus(user.getId(), false)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn"));
        double price = orderRequest.getTotal();

        String orderType = "other";
        long amount = (long) price*100;

        String vnp_TxnRef = ConfigVNPay.getRandomNumber(8);

        String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        String returnUrl = ConfigVNPay.vnp_ReturnUrl;
        returnUrl += "?methodPayment=" + orderRequest.getMethodPayment() +
                "&methodDelivery=" + orderRequest.getMethodDelivery()+
                "&address=" +orderRequest.getAddress()+
                "&total=" + amount +
                "&orderId=" + order.getId() +
                "&email=" + user.getEmail();


        vnp_Params.put("vnp_ReturnUrl", returnUrl);
        vnp_Params.put("vnp_IpAddr", request.getRemoteAddr());

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = ConfigVNPay.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    private UserEntity resolveUserFromRequest(HttpServletRequest request) {
        try {
            String headerAuth = request.getHeader("Authorization");
            if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
                return null;
            }
            String token = headerAuth.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return null;
            }
            Long userId = jwtTokenUtil.extractUserId(token);
            if (userId == null) return null;
            return userRepository.findById(userId).orElse(null);
        } catch (Exception ex) {
            log.warn("resolveUserFromRequest failed: {}", ex.getMessage());
            return null;
        }
    }
}
