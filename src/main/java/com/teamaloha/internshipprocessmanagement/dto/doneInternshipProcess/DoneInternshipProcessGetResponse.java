package com.teamaloha.internshipprocessmanagement.dto.doneInternshipProcess;

import com.teamaloha.internshipprocessmanagement.enums.ProcessStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoneInternshipProcessGetResponse {

    private Integer studentId;

    private String fullName;

    private Date updateDate;

    private Integer id;

    private String tc;

    private String studentNumber;

    private String telephoneNumber;

    private Integer classNumber;

    private String position;

    private String internshipType;

    private Integer internshipNumber;

    private Date startDate;

    private Date endDate;

    private Integer companyId;

    private Integer departmentId;

    private String engineerMail;

    private String engineerName;

    private String mustehaklikBelgesiPath;

    private String transkriptPath;

    private String stajRaporuPath;

    private ProcessStatusEnum processStatus;

}