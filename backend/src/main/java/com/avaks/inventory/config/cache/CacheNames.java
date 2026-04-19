package com.avaks.inventory.config.cache;

public final class CacheNames {

    private CacheNames() {
    }

    public static final String PRODUCTS_BY_USER = "productsByUser";
    public static final String PRODUCTS_SALE_INFO_BY_USER = "productsSaleInfoByUser";
    public static final String PRODUCT_BY_USER_AND_ID = "productByUserAndId";

    public static final String SUPPLIERS_BY_USER = "suppliersByUser";
    public static final String SUPPLIER_BY_USER_AND_ID = "supplierByUserAndId";

    public static final String TOTAL_PROFIT_BY_USER = "totalProfitByUser";
    public static final String LATEST_PROFIT_BY_USER = "latestProfitByUser";

    public static final String[] ALL_CACHES = {
            PRODUCTS_BY_USER,
            PRODUCTS_SALE_INFO_BY_USER,
            PRODUCT_BY_USER_AND_ID,
            SUPPLIERS_BY_USER,
            SUPPLIER_BY_USER_AND_ID,
            TOTAL_PROFIT_BY_USER,
            LATEST_PROFIT_BY_USER
    };
}
