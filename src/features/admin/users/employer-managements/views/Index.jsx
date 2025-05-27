import React, { useEffect, useState } from "react";
import { getEmployersSummary } from "../usecases/queries/getEmployersSummary";
export default function Index() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEmployersSummary(
      // onSuccess
      (data) => {
        setEmployers(data);
        setLoading(false);
        console.log("Employers data:", data);
      },
      // onFail
      (error) => {
        setLoading(false);
      },
      // onException
      (exception) => {
        console.error("Exception:", exception);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }
  return (
    <div>
      <h1>Quản lý nhà tuyển dụng</h1>
    </div>
  );
}
