package com.teamaloha.internshipprocessmanagement.dao;

import com.teamaloha.internshipprocessmanagement.entity.Academician;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AcademicianDao extends JpaRepository<Academician, Integer> {

    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH,
    attributePaths = {
            "department"
    })
    Academician findByMail(String mail);

    @Query("SELECT a.id FROM Academician a WHERE a.internshipCommittee = :internshipCommittee AND a.department.id = :departmentId")
    List<Integer> findAcademicianIdsByInternshipCommitteeAndDepartment(
            @Param("internshipCommittee") Boolean internshipCommittee,
            @Param("departmentId") Integer departmentId
    );

    @Query("SELECT a.id FROM Academician a WHERE a.internshipCommittee = :departmentChair AND a.department.id = :departmentId")
    List<Integer> findAcademicianIdsByDepartmentChairAndDepartment(
            @Param("departmentChair") Boolean departmentChair,
            @Param("departmentId") Integer departmentId
    );

    @Query("SELECT a.id FROM Academician a WHERE a.internshipCommittee = :executive AND a.department.id = :departmentId")
    List<Integer> findAcademicianIdsByExecutiveAndDepartment(
            @Param("executive") Boolean executive,
            @Param("departmentId") Integer departmentId
    );

    @Query("SELECT a.id FROM Academician a WHERE a.internshipCommittee = :academic AND a.department.id = :departmentId")
    List<Integer> findAcademicianIdsByAcademicAndDepartment(
            @Param("academic") Boolean academic,
            @Param("departmentId") Integer departmentId
    );

}
