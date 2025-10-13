package com.project.electronics.converter;

import com.project.electronics.dto.request.MemoryRequest;
import com.project.electronics.dto.response.MemoryResponse;
import com.project.electronics.models.MemoryEntity;
import org.springframework.stereotype.Component;

@Component
public class MemoryConverter {
    public MemoryResponse toResponse(MemoryEntity e) {
        return MemoryResponse.builder()
                .id(e.getId())
                .name(e.getName())
                .price(e.getPrice())
                .build();
    }

    public MemoryEntity toEntity(MemoryRequest req) {
        return MemoryEntity.builder()
                .name(req.getName())
                .price(req.getPrice())
                .build();
    }

    public void updateEntity(MemoryEntity e, MemoryRequest req) {
        e.setName(req.getName());
        e.setPrice(req.getPrice());
    }
}
