package com.project.electronics.service;


import com.project.electronics.dto.request.AIRequest;
import com.project.electronics.dto.response.AIProductResponse;

import java.util.List;

public interface IAIService {
    List<AIProductResponse> getAIProduct(AIRequest request);
}
