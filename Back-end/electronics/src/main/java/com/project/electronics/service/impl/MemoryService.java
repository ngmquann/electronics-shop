package com.project.electronics.service.impl;


import com.project.electronics.converter.MemoryConverter;
import com.project.electronics.customexceptions.DataNotFoundException;
import com.project.electronics.dto.request.MemoryRequest;
import com.project.electronics.dto.response.MemoryResponse;
import com.project.electronics.models.MemoryEntity;
import com.project.electronics.repository.MemoryRepository;
import com.project.electronics.service.IMemoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class MemoryService implements IMemoryService {
    private final MemoryRepository memoryRepository;
    private final MemoryConverter memoryConverter;

    @Override
    public List<MemoryResponse> getAllMemoryResponses() {
        return memoryRepository.findAll()
                .stream().map(memoryConverter::toResponse).toList();
    }

    @Override
    public MemoryResponse getMemoryResponseById(Long id) {
        MemoryEntity e = memoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Memory not found with id: " + id));
        return memoryConverter.toResponse(e);
    }

    @Override
    public String createMemory(MemoryRequest request) {
        if (memoryRepository.existsByNameIgnoreCase(request.getName()))
            throw new IllegalArgumentException("Memory name already exists");
        MemoryEntity saved = memoryRepository.save(memoryConverter.toEntity(request));
        return "Memory created with id " + saved.getId();
    }

    @Override
    public String updateMemory(Long id, MemoryRequest request) {
        MemoryEntity e = memoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Memory not found with id: " + id));

        if (!e.getName().equalsIgnoreCase(request.getName())
                && memoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Memory name already exists");
        }
        memoryConverter.updateEntity(e, request);
        memoryRepository.save(e);
        return "Memory updated";
    }

    @Override
    public String deleteMemory(Long id) {
        MemoryEntity e = memoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Memory not found with id: " + id));
        memoryRepository.delete(e);
        return "Memory deleted";
    }
}
