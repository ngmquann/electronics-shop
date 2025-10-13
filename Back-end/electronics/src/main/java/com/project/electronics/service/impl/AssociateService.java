package com.project.electronics.service.impl;

import com.project.electronics.converter.AssociateConverter;
import com.project.electronics.dto.request.AssociateRequest;
import com.project.electronics.dto.response.AssociateResponse;
import com.project.electronics.models.AssociateEntity;
import com.project.electronics.repository.AssociateRepository;
import com.project.electronics.service.IAssociateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class AssociateService implements IAssociateService {

    private final AssociateRepository associateRepository;
    private final AssociateConverter associateConverter;

    @Override
    public String createAssociate(AssociateRequest associateRequest) {
        if (associateRequest.getId() != null) {
            AssociateEntity existing = associateRepository.findById(associateRequest.getId())
                    .orElseThrow(() -> new RuntimeException("Associate not found with id: " + associateRequest.getId()));

            existing.setLogo(associateRequest.getLogo());
            existing.setName(associateRequest.getName());
            existing.setType(associateRequest.getType());
            associateRepository.save(existing);

            return "Associate updated";
        } else {
            AssociateEntity associate = AssociateEntity.builder()
                    .logo(associateRequest.getLogo())
                    .name(associateRequest.getName())
                    .type(associateRequest.getType())
                    .build();
            associateRepository.save(associate);

            return "Associate created";
        }
    }


    @Override
    public List<AssociateResponse> getAllAssociates() {
        return associateRepository.findAll()
                .stream()
                .map(entity -> associateConverter.toAssociateResponse(entity))
                .toList();
    }

    @Override
    public String deleteAssociateById(Long associateId) {
        if (!associateRepository.existsById(associateId)) {
            throw new IllegalArgumentException("Associate not found: " + associateId);
        }
        associateRepository.deleteById(associateId);
        return "Associate deleted";
    }

    @Override
    public AssociateResponse getAssociateById(Long associateId) {
        AssociateEntity existing = associateRepository.findById(associateId)
                .orElseThrow(() -> new RuntimeException("Associate not found with id: " + associateId));

        return associateConverter.toAssociateResponse(existing);
    }

}
