import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TextEditor } from "@/components/my-components/text-editor/TextEditor";
import React from "react";
import { useState, useRef } from "react";
import { showErrorToastHasTitle } from "@/components/my-components/MyToast";
import { showSuccessToastHasTitle } from "@/components/my-components/MyToast";
import { Button } from "@/components/ui/button";
import { convertImageToBase64 } from "@/utils/imageUtils";
export default function AddBlogPost() {
  const [keyRenderImediately, setKeyRenderImediately] = useState(0);
  //tieu de,main image ,shortcontent de chen vao text editor
  const [title, setTitle] = useState("");
  const [shortContent, setShortContent] = useState("");
  const [mainImage, setMainImage] = useState("");
  //ref toi text editor
  const insertContentRef = useRef(null);

  //anh chinh
  const inputFileRef = useRef(null);
  const openFilePicker = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
      inputFileRef.current.click();
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.match("image.*")) {
      showErrorToastHasTitle("Lỗi", "Vui lòng chọn file hình ảnh");
      return;
    }

    try {
      var imgBase64 = await convertImageToBase64(file);
      console.log("base64, length:", imgBase64.length);
      setMainImage(imgBase64);
    } catch (error) {
      console.error("Error convert image:", error);
      showErrorToastHasTitle("Lỗi", "Không thể xử lý hình ảnh này");
    }
  };

  //insert vo text editor
  const handleInsertContent = () => {
    if (!title || !mainImage || !shortContent) {
      showErrorToastHasTitle("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const content = `
      <h2>${title}</h2>
      <img src="${mainImage}" alt="Main Image" />
      <p>${shortContent}</p>
    `;
    insertContentRef.current = content;
    console.log("insertContentRef:", content);
    setKeyRenderImediately((prev) => prev + 1);
    console.log("Đã chèn nội dung vào Text Editor");
  };

  const handleHuy = () => {
    setTitle("");
    setShortContent("");
    setMainImage("");
    insertContentRef.current = "";
  };

  const handleSaveContent = (content) => {
    const msgs = [];

    if (title === null || title.trim() === "") {
      msgs.push("Tiêu đề không được để trống");
    }
    if (title.length > 500) {
      msgs.push("Tiêu đề không được quá 500 ký tự");
    }

    if (shortContent === null || shortContent.trim() === "") {
      msgs.push("Nội dung không được để trống");
    }

    if (shortContent.length > 2000) {
      msgs.push("Nội dung không được quá 2000 ký tự");
    }
    if (mainImage === null || mainImage.trim() === "") {
      msgs.push("Ảnh chính không được để trống");
    }

    if (msgs.length > 0) {
      showErrorToastHasTitle("Lỗi", msgs);
      return;
    }

    console.log("content:", content);
  };

  return (
    <>
      <div className="pt-4 bg-background rounded-xl border pb-10">
        <div className="border-b pl-4 pb-4 flex gap-2">
          <h1 className="text-2xl">Thêm bài đăng tin tức</h1>
        </div>

        {/* input  */}
        <div className="p-4">
          {/* input tieu de */}
          <div>
            <label className="text-lg font-semibold">Tiêu đề bài đăng</label>
            <Input
              placeHolder="Nhập tiêu đề"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></Input>
          </div>

          {/* input main image */}
          <div className="mt-4">
            <label className="text-lg font-semibold">Ảnh chính</label>
            <Button
              className="ml-5 hover:cursor-pointer mb-5"
              onClick={openFilePicker}
            >
              Thêm ảnh
            </Button>
            <div className="border w-max h-max rounded-lg overflow-hidden">
              <img
                src={mainImage}
                className={`object-cover max-w-[${400}] max-h-[${600}]`}
              ></img>
            </div>

            <input
              type="file"
              ref={inputFileRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="mt-4">
            <label className="text-lg font-semibold">Nội dung vắn tắt</label>
            <div className="grid w-full">
              <Textarea
                placeholder="Nội dung vắn tắt"
                value={shortContent}
                onChange={(e) => {
                  setShortContent(e.target.value);
                }}
              ></Textarea>
            </div>
          </div>

          {/* texteditor */}
          <div className="mt-4">
            <Button
              className="ml-5 hover:cursor-pointer mb-1"
              onClick={handleInsertContent}
            >
              Chèn tiêu đề, ảnh chính, nội dung vắn tắt vào
            </Button>
            <TextEditor
              handleHuy={handleHuy}
              key={keyRenderImediately}
              height={800}
              onSave={handleSaveContent}
              initialValue={insertContentRef.current}
            />
          </div>
        </div>
      </div>
    </>
  );
}
