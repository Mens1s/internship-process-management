import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { Text } from "src/context/LanguageProvider";
import type { SelectProps } from "antd";
import { message, Skeleton } from "antd";

import { Row, Col, Form, Input, DatePicker, Modal, Button } from "antd";
import axios from "src/services/axios";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import useDepartments from "src/hooks/useDepartments";

const DatePickersContainer = styled.div`
  display: flex;
  gap: 10px;

  div {
    width: 100%;
  }

  button {
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

const Holidays: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [saveLoading, setSaveLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Tatil bilgileri güncellendi!",
    });
  };

  const errorMessage = (content?: any) => {
    messageApi.open({
      type: "error",
      content: content ? content : "Bir hata oluştu. Lütfen tekrar deneyiniz.",
      duration: 5,
    });
  };

  const departmentOptions = useDepartments();
  const [companyOptionss, setCompanyOptionss] = useState<
    SelectProps["options"]
  >([]);

  const companyOptions: SelectProps["options"] = [];

  const showModal = () => {
    setIsModalOpen(true);
    console.log("form", form.getFieldsValue());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleHolidayApprove = () => {
    const jwtToken = window.localStorage.getItem("token");
    const formData = form.getFieldsValue();

    const postData = {
      date: formData?.holidayDate,
      name: formData?.holidayName,
      description: formData?.holidayDescription,
    };

    setSaveLoading(true);
    setIsModalOpen(false);
    axios
      .post("http://localhost:8000/api/holiday/addHoliday", postData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        success();
      })
      .catch((error) => {
        console.log("error:", error);
        console.log(jwtToken);
        errorMessage();
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSend = () => {
    const jwtToken = window.localStorage.getItem("token");
    setConfirmLoading(true);

    axios
      .post("http://localhost:8000/api/internship-process/start", null, {
        params: {},
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        alert("Başvurunuz başarıyla alındı işleme koyuldu.");
        console.log(response);
      })
      .catch((error) => {
        console.log("error:", error.response);
        const message =
          error.response.status == 400
            ? "Başvuru formu boş bırakılamaz."
            : "Bir hata oluştu. Lütfen tekrar deneyiniz.";
        errorMessage(message);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <div>
      {contextHolder}
      <>
        <Form form={form} layout="vertical" size="large">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="holidayName" label="Tatil Adını Giriniz">
                <Input />
              </Form.Item>
              <Form.Item name="holidayDescription" label="Tatil Açıklamasını">
                <Input />
              </Form.Item>
              <DatePickersContainer>
                <Form.Item name="holidayDate" label="Tatil Günü">
                  <DatePicker />
                </Form.Item>
              </DatePickersContainer>

              <DatePickersContainer>
                <Button onClick={handleCancel}>
                  <Text tid="cancel" />
                </Button>
                <Button onClick={showModal} type="primary">
                  <Text tid="confirm" />
                </Button>
              </DatePickersContainer>
            </Col>
          </Row>
        </Form>
        <Modal
          title="Tatil Gününü Onayla"
          open={isModalOpen}
          onOk={handleHolidayApprove}
          onCancel={handleCancel}
        >
          <p>
            <Text tid="createApplicationFormApprovementModalText" />
          </p>
        </Modal>
      </>
    </div>
  );
};

export default Holidays;
