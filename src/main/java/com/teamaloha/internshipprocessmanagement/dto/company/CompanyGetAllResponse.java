package com.teamaloha.internshipprocessmanagement.dto.company;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyGetAllResponse {
    private List<CompanyGetResponse> companyList;
}
