import React from "react";
import { IconAdd } from "@/components/my-components/icon/IconAdd";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate("/employer/job-post/add");
  };

  return (
    <>
      <div className="pt-4 bg-background rounded-xl border pb-10">
        {/* title */}
        <div className="border-b pl-4 pb-4 flex gap-2">
          <h1 className="text-2xl">Danh sách bài đăng tuyển dụng</h1>
          <IconAdd onClick={handleAddPost}></IconAdd>
        </div>

        {/* content */}
        <div>content</div>
      </div>
    </>
  );
}
