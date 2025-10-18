package com.project.electronics.service.impl;

import com.project.electronics.dto.request.AIRequest;
import com.project.electronics.dto.response.AIProductResponse;
import com.project.electronics.service.IAIService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AIService implements IAIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder builder) {
        this.chatClient = builder
                .build();
    }
    @Override
    public List<AIProductResponse> getAIProduct(AIRequest request){
        String content = request.getContent();


        SystemMessage systemMessage = new SystemMessage("""
               
            """);

        UserMessage userMessage = new UserMessage(content);

        ChatResponse response = chatClient.prompt()
                .messages(systemMessage, userMessage)
                .call()
                .chatResponse();

        AIProductResponse
        return;
    }



}