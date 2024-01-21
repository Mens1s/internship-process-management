import React from "react";

import { TbFileFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Tooltip, Spin } from "antd";
import styled from "styled-components";

import { LoadingOutlined } from "@ant-design/icons";
import UseLanguage from "src/hooks/useLanguage";

const StyledMdDelete = styled(MdDelete)`
  border-radius: 10px;
  color: #869bbd;
  font-size: 1.2rem;
  padding: 5px;
  box-sizing: content-box;
  transition: 0.3s;

  &:hover {
    background: #c5d0de;
  }
`;

const List = styled.div``;
const ListItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  border-radius: 10px;
  transition: 0.3s;
  background: #f0f4f9;
  border: 1px solid #cfd8e3;

  &:hover {
    background: #dfe4eb;
  }

  margin-bottom: 20px;
`;

const FileListItem: React.FC = () => {
  const { dictionary } = UseLanguage();
  return (
    <ListItem>
      {true ? (
        <Spin
          size="small"
          style={{ color: "#869bbd" }}
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TbFileFilled
              style={{
                color: "#869bbd",
                fontSize: "1.2rem",
              }}
            />
            <p style={{ fontWeight: "500", color: "#869bbd" }}></p>
          </div>
          <Tooltip title={dictionary.remove}>
            <StyledMdDelete />
          </Tooltip>
        </div>
      )}
    </ListItem>
  );
};

export default FileListItem;
