package com.RecipeAPI.RecipeAPI.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "ingredients")
public class Ingredient {

    @Id
    private String id;
    private String name;
    private String unit;

    @Field(targetType = FieldType.DOUBLE) // Specify the field type
    private double unitPrice;
    private String photo_url;
    private double quantity;

    public Ingredient() {

    }

    public Ingredient(Ingredient ingredient) {
        //check if any fields are null
        if (ingredient.getName() != null) {
            this.name = ingredient.getName();
        }
        if (ingredient.getUnit() != null) {
            this.unit = ingredient.getUnit();
        }
        if (ingredient.getUnitPrice() != 0) {
            this.unitPrice = ingredient.getUnitPrice();
        }
        if (ingredient.getQuantity() != 0) {
            this.quantity = ingredient.getQuantity();
        }
        if (ingredient.getPhoto_url() != null) {
            this.photo_url = ingredient.getPhoto_url();
        }

    }

    public Ingredient(String name, String unit, double unitPrice) {
        this.name = name;
        this.unit = unit;
        this.unitPrice = unitPrice;
    }

    public String getName() {
        return name;
    }

    public String getUnit() {
        return unit;
    }

    public double getQuantity() {
        return quantity;
    }
    public String getPhoto_url() {
        return photo_url;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPhoto_url(String photo_url) {
        this.photo_url = photo_url;
    }

    @Override
    public String toString() {

        return "Ingredient{" +
            "name='" + name + '\'' +
            ", unit='" + unit + '\'' +
            ", unitPrice=" + unitPrice +
            ", photo_url='" + photo_url + '\'' +
            ", quantity=" + quantity +
            '}';
    }




}
