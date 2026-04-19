package com.avaks.inventory.repository;

import com.avaks.inventory.model.ProfitRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfitRecordRepository extends JpaRepository<ProfitRecord, Long> {
    ProfitRecord findTopByUserIdOrderByTimestampDesc(Long userId);
    void deleteAllByUserId(Long userId);
}
