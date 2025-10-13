package com.project.electronics.controller;


import com.project.electronics.dto.request.MemoryRequest;
import com.project.electronics.dto.response.MemoryResponse;
import com.project.electronics.service.IMemoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/memory")
public class MemoryController {
    @Autowired
    private  IMemoryService memoryService;
    @GetMapping("/all")
    public ResponseEntity<List<MemoryResponse>> getAllMeResponse() {
        return ResponseEntity.ok(memoryService.getAllMemoryResponses());
    }
    @GetMapping("/get-by/{id}")
    public ResponseEntity<MemoryResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(memoryService.getMemoryResponseById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody MemoryRequest request) {
        String msg = memoryService.createMemory(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", msg));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id,
                                                      @Valid @RequestBody MemoryRequest request) {
        String msg = memoryService.updateMemory(id, request);
        return ResponseEntity.ok(Map.of("message", msg));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        String msg = memoryService.deleteMemory(id);
        return ResponseEntity.ok(Map.of("message", msg));
    }
}
