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
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Breadcrumb.Item key={index}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              <Link to={`${role}/${routeTo}`}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
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
