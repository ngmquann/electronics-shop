package com.project.electronics.converter;

import com.project.electronics.dto.response.AssociateResponse;
import com.project.electronics.models.AssociateEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class AssociateConverter {
    @Autowired
    private ModelMapper modelMapper;

    public AssociateResponse toAssociateResponse(AssociateEntity associate) {
        AssociateResponse associateResponse = modelMapper.map(associate, AssociateResponse.class);

        return associateResponse;
    }

}
