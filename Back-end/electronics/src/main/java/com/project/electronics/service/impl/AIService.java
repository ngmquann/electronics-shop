package com.project.electronics.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.electronics.dto.request.AIRequest;
import com.project.electronics.dto.response.AIProductResponse;
import com.project.electronics.dto.response.APIAIProductResponse;
import com.project.electronics.models.CategoryEntity;
import com.project.electronics.models.ProductEntity;
import com.project.electronics.repository.CategoryRepository;
import com.project.electronics.repository.ProductRepository;
import com.project.electronics.service.IAIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class AIService implements IAIService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ChatClient chatClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public APIAIProductResponse getAIProduct(AIRequest request) {

        String content = request.getContent();
        if (content == null || content.isBlank()) {
            return new APIAIProductResponse(403, null, "Chưa có gì được nhập", null);
        }

        SystemMessage systemMessage = new SystemMessage("""
        Bạn là trợ lý phân tích ý định người dùng.
        Phân tích và trả về JSON với 2 trường:
        - intent: "category" (hỏi về danh mục), "product" (tìm sản phẩm), hoặc "none"
        - keyword: từ khóa tìm kiếm (chỉ dùng khi intent="product")
        
        Ví dụ:
        Input: "Cho tôi xem danh mục" → {"intent":"category","keyword":"none"}
        Input: "Tìm điện thoại iPhone" → {"intent":"product","keyword":"iPhone"}
        
        CHỈ TRẢ VỀ JSON THUẦN, KHÔNG THÊM ```json hoặc markdown.
        """);

        ChatResponse response = chatClient.prompt()
                .messages(systemMessage, new UserMessage(content))
                .call()
                .chatResponse();

        String aiText = response.getResults().get(0).getOutput().getText();

        log.info("Raw AI response: {}", aiText);

        aiText = aiText.trim();


        if (aiText.startsWith("```json")) {
            aiText = aiText.substring(7);
        } else if (aiText.startsWith("```")) {
            aiText = aiText.substring(3);
        }


        if (aiText.endsWith("```")) {
            aiText = aiText.substring(0, aiText.length() - 3);
        }

        aiText = aiText.trim();

        log.info("Cleaned JSON: {}", aiText);

        String intent = "none";
        String keyword = null;

        try {
            JsonNode root = objectMapper.readTree(aiText);
            intent = root.path("intent").asText("none");

            JsonNode keywordNode = root.path("keyword");
            if (!keywordNode.isMissingNode() &&
                    !keywordNode.isNull() &&
                    !"none".equalsIgnoreCase(keywordNode.asText()) &&
                    !keywordNode.asText().isBlank()) {
                keyword = keywordNode.asText();
            }

            log.info("Parsed - intent: {}, keyword: {}", intent, keyword);

        } catch (Exception e) {
            log.error("Failed to parse JSON. Raw text: {}", aiText, e);
            return new APIAIProductResponse(500, "none", "Lỗi xử lý phản hồi AI", null);
        }

        if ("category".equalsIgnoreCase(intent)) {
            List<CategoryEntity> categories = categoryRepository.findAll();
            List<AIProductResponse> data = new ArrayList<>();

            for (CategoryEntity c : categories) {
                data.add(AIProductResponse.builder()
                        .id(c.getId())
                        .name(c.getName())
                        .image(c.getData())
                        .build());
            }

            return new APIAIProductResponse(200, intent, "Danh mục sản phẩm", data);
        }

        if ("product".equalsIgnoreCase(intent) && keyword != null) {
            List<ProductEntity> products = productRepository.findByNameContainingIgnoreCase(keyword);
            List<AIProductResponse> data = new ArrayList<>();

            for (ProductEntity p : products) {
                data.add(AIProductResponse.builder()
                        .id(p.getId())
                        .name(p.getName())
                        .categoryName(p.getCategory().getName())
                        .description(p.getDetail())
                        .image(p.getImages().isEmpty() ? null : p.getImages().get(0).getData())
                        .build());
            }

            if (data.isEmpty()) {
                return new APIAIProductResponse(404, intent, "Không tìm thấy sản phẩm chứa: " + keyword, null);
            }

            return new APIAIProductResponse(200, intent, "Danh sách sản phẩm theo từ khóa", data);
        }

        return new APIAIProductResponse(400, intent, "Không hiểu yêu cầu", null);
    }
}
