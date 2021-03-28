package com.store.repository;


import com.store.models.ProductComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductCommentRepository extends JpaRepository<ProductComments, Long> {

}
