package com.project.electronics.controller;


import com.project.electronics.dto.request.AssociateRequest;
import com.project.electronics.dto.response.AssociateResponse;
import com.project.electronics.service.impl.AssociateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/associates")
public class AssociatesController {
    @Autowired
    private AssociateService associateService;
    @PostMapping("/create")
    public ResponseEntity<?> createAssociate(@RequestBody AssociateRequest associateRequest) {
        String message = associateService.createAssociate(associateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", message));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateAssociate(@RequestBody AssociateRequest associateRequest) {
        String message = associateService.createAssociate(associateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", message));
    }
    @GetMapping("/by-admin")
    public ResponseEntity<?> getAllAssociates() {
        List<AssociateResponse> list = associateService.getAllAssociates();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getAssociateById(@PathVariable Long id) {
        AssociateResponse associateResponse = associateService.getAssociateById(id);
        return ResponseEntity.status(HttpStatus.OK).body(associateResponse);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        String message =  associateService.deleteAssociateById(id);
        return ResponseEntity.ok(Map.of("message", message));
    }

}
