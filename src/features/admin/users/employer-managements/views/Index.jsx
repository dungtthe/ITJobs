import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getEmployersSummary } from "../usecases/queries/getEmployersSummary";
import { CiSearch } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

import { FaEye } from "react-icons/fa";

import no_img_user from "@/assets/images/no_img_user.png";
import { formatVND } from "@/utils/formatUtils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
    return <></>;
  }
  return (
    <>
      <div className="pt-4">
        {/* title */}
        <div className="border-b pl-4 pb-4">
          <h1 className="text-2xl ">Danh sách nhà tuyển dụng</h1>
        </div>

        {/* content */}
        <div className="border rounded-lg mt-6 ml-7 mr-7">
          {/* show and search */}
          <div className="flex items-center justify-between p-6">
            {/*  số lượng show*/}
            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Hiển thị</span>
              <select
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                defaultValue="10"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-foreground/70">mục trên mỗi trang</span>
            </div>

            {/* search */}
            <div className="group h-11 w-[400px] rounded-md border border-input shadow-sm flex items-center group-hover:border-input/70 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 group-hover:shadow-md transition-shadow duration-150">
              <CiSearch className="text-muted-foreground/70 ml-1.5" size={34} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="h-full w-full border-none rounded-none ml-3 mr-3 focus:outline-none"
              />
            </div>
          </div>

          {/* table */}
          <div className="overflow-auto px-6 pb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-t">
                  <th className="py-3.5 pl-6 pr-2 text-center font-medium text-xs uppercase tracking-wider text-foreground/70">
                    STT
                  </th>
                  <th className="py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Hình ảnh
                  </th>
                  <th className="py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Tên công ty
                  </th>
                  <th className="py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Email
                  </th>
                  <th className="py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Số dư tài khoản
                  </th>
                  <th className="py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Trạng thái
                  </th>
                  <th className="py-3.5 px-4 text-left font-medium text-xs uppercase tracking-wider text-foreground/70">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {employers.map((employer, index) => (
                  <tr
                    key={employer.userId}
                    className="border-b hover:bg-muted/30"
                  >
                    <td className="py-4 pl-6 pr-2">
                      <div className="flex justify-center items-center">
                        <span className="h-6 w-6 rounded-full bg-muted/60 flex items-center justify-center text-xs font-semibold text-foreground/80">
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        {employer.image === "no_img_user.png" ? (
                          <img
                            src={no_img_user}
                            alt="Avatar"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={employer.image}
                            alt="Avatar"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {employer.companyName}
                    </td>
                    <td className="py-4 px-4 text-sm">{employer.email}</td>
                    <td className="py-4 px-4 text-sm font-medium">
                      {formatVND(employer.accountBalance)}
                    </td>
                    <td className="py-4 px-4">
                      {employer.isLock ? (
                        <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-md font-medium">
                          Đã khóa
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-md font-medium">
                          Hoạt động
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors">
                          <FaEye size={16} />
                        </button>

                        {employer.isLock ? (
                          <button className="p-1.5 bg-success/10 text-success rounded hover:bg-success/20 transition-colors">
                            <FaUnlock size={16} />
                          </button>
                        ) : (
                          <button className="p-1.5 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors">
                            <FaLock size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="flex items-center py-6 border-t">
            <Pagination className="justify-end mr-20">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors [&>span]:text-sm hover:text-primary"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive
                    className="bg-primary text-primary-foreground hover:bg-primary/90 border-none"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="border border-input hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-foreground/70" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="border border-input hover:bg-primary/10 hover:border-primary/30 transition-colors [&>span]:text-sm hover:text-primary"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
