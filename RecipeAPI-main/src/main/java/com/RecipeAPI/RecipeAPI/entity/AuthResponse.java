package com.RecipeAPI.RecipeAPI.entity;

public class AuthResponse {

    String id;
    String status;

    public AuthResponse(String id, String status) {
        this.id = id;
        this.status = status;
    }

    public AuthResponse() {

    }

    public String getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String toString() {
        return "AuthResponse{" +
            "id='" + id + '\'' +
            ", status='" + status + '\'' +
            '}';
    }

}
