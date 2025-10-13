package com.project.electronics.service;

import com.project.electronics.dto.request.AssociateRequest;
import com.project.electronics.dto.response.AssociateResponse;

import java.util.List;

public interface IAssociateService {
    String createAssociate(AssociateRequest associateRequest);
    List<AssociateResponse> getAllAssociates();
    String deleteAssociateById(Long associateId);
    AssociateResponse getAssociateById(Long associateId);
}
