import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const MyBreadcrumb: React.FC = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    let pathnames = pathname.split("/").filter((item) => item);
    const role = pathnames[0];
    pathnames = pathnames.filter((item) => {
      if (item !== "ogrenci" && item !== "akademisyen" && item !== "evaluate")
        return item;
    });

    return (
      <Breadcrumb>
        {pathnames.length > 0 ? (
          <Breadcrumb.Item>
            <Link to={`/${role}`}>
              <div style={{ fontSize: "12px" }}>Ana Sayfa</div>
            </Link>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item>
            <Link to={""}>
              <div style={{ fontSize: "12px" }}>Ana Sayfa</div>
            </Link>
          </Breadcrumb.Item>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Breadcrumb.Item key={index}>
              <Link to={""}>
                <div style={{ fontSize: "12px" }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
                </div>
              </Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              <Link to={`${role}/${routeTo}`}>
                <div style={{ fontSize: "12px" }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default MyBreadcrumb;
