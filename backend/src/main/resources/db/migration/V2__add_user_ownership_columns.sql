ALTER TABLE supplier
    ADD COLUMN IF NOT EXISTS user_id BIGINT NULL;

ALTER TABLE product
    ADD COLUMN IF NOT EXISTS user_id BIGINT NULL;

ALTER TABLE sale
    ADD COLUMN IF NOT EXISTS user_id BIGINT NULL;

ALTER TABLE profit_record
    ADD COLUMN IF NOT EXISTS user_id BIGINT NULL;

ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS user_id BIGINT NULL;

CREATE INDEX IF NOT EXISTS idx_supplier_user_id ON supplier (user_id);
CREATE INDEX IF NOT EXISTS idx_product_user_id ON product (user_id);
CREATE INDEX IF NOT EXISTS idx_sale_user_id ON sale (user_id);
CREATE INDEX IF NOT EXISTS idx_profit_record_user_id ON profit_record (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
