package com.project.electronics.service;

public interface IFavoriteService {
    boolean toggleFavorite(Long productId, Long userId);
}
