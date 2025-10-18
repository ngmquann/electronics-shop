package com.project.electronics.controller;

import com.project.electronics.dto.request.AIRequest;
import com.project.electronics.dto.response.AIProductResponse;
import com.project.electronics.service.impl.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/question")
    public ResponseEntity<?> getTranslate(@RequestBody AIRequest aiRequest) {
        List<AIProductResponse> result = aiService.getAIProduct(aiRequest);
        Map<String, Object> rs = new HashMap<>();
        rs.put("result", result);
        return ResponseEntity.ok(rs);
    }
}