package com.project.electronics.service;

import com.project.electronics.dto.request.MemoryRequest;
import com.project.electronics.dto.response.MemoryResponse;

import java.util.List;

public interface IMemoryService {

    List<MemoryResponse> getAllMemoryResponses();

    MemoryResponse getMemoryResponseById(Long id);
    String createMemory(MemoryRequest request);
    String updateMemory(Long id, MemoryRequest request);
    String deleteMemory(Long id);
}
