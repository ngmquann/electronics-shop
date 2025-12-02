package com.project.electronics.service;


import com.project.electronics.dto.request.AIRequest;
import com.project.electronics.dto.response.APIAIProductResponse;

import java.util.List;

public interface IAIService {
    APIAIProductResponse getAIProduct(AIRequest request);
}
