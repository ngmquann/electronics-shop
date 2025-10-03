package com.project.electronics.service;


import com.project.electronics.dto.response.HeaderHomeResponse;

public interface IHomeService {
     HeaderHomeResponse getHeaderHome(Long id);
}

