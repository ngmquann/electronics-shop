package com.project.electronics.converter;

import com.project.electronics.dto.response.AssociateResponse;
import com.project.electronics.dto.response.OrderResponse;
import com.project.electronics.models.AssociateEntity;
import com.project.electronics.models.OrderEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class OrderConverter {
    @Autowired
    private ModelMapper modelMapper;

    public OrderResponse toOrderResponse(OrderEntity order) {

        return modelMapper.map(order, OrderResponse.class);
    }

}
