package com.teamaloha.internshipprocessmanagement.dao;

import com.teamaloha.internshipprocessmanagement.entity.Academician;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AcademicianDao extends JpaRepository<Academician, Integer>,
                                        JpaSpecificationExecutor<Academician> {

    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH,
    attributePaths = {
            "department"
    })
    Academician findByMail(String mail);

    @Override
    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH,
            attributePaths = {
                    "department"
            })
    List<Academician> findAll();

    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH,
            attributePaths = {
                    "department"
            })
    Academician findAcademicianById(Integer id);


    @Query("SELECT a.id FROM Academician a WHERE a.internshipCommittee = :internshipCommittee AND a.department.id = :departmentId")
    List<Integer> findAcademiciansIdsByInternshipCommitteeAndDepartment(
            @Param("internshipCommittee") Boolean internshipCommittee,
            @Param("departmentId") Integer departmentId
    );

    @Query("SELECT a.id FROM Academician a WHERE a.departmentChair = :departmentChair AND a.department.id = :departmentId")
    List<Integer> findAcademicianIdsByDepartmentChairAndDepartment(
            @Param("departmentChair") Boolean departmentChair,
            @Param("departmentId") Integer departmentId
    );

    @Query("SELECT a.id FROM Academician a WHERE a.executive = :executive AND a.department.id = :departmentId")
    List<Integer> findAcademicianIdsByExecutiveAndDepartment(
            @Param("executive") Boolean executive,
            @Param("departmentId") Integer departmentId
    );

    @Query("SELECT a.id FROM Academician a WHERE a.academic = :academic AND a.department.id = :departmentId")
    List<Integer> findAcademicianIdsByAcademicAndDepartment(
            @Param("academic") Boolean academic,
            @Param("departmentId") Integer departmentId
    );

}
