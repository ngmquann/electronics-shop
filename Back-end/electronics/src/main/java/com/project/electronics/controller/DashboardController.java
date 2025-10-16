package com.project.electronics.controller;


import com.project.electronics.dto.response.DashboardResponse;
import com.project.electronics.service.impl.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<?> getDashboard() {
        DashboardResponse results = dashboardService.getDashboard();
        return ResponseEntity.ok(results);
    }
}
