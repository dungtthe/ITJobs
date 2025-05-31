import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ButtonSuccess } from "../button/ButtonSuccess";
export const TextEditor = ({
  height,
  initialValue = "",
  onSave,
  onChange,
  uploadHandler,
}) => {
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    setContent(content);
    if (onChange) onChange(content, editor);
  };

  const handleSave = () => {
    if (onSave) onSave(content);
  };

  return (
    <div className="text-editor-container">
      <Editor
        apiKey="pib4lsgj16ujj516suugks5ofwgybghru0yejb66deqarvc3"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          menubar: true,
          plugins: `
                advlist autolink lists link image charmap preview anchor
                searchreplace visualblocks code fullscreen
                insertdatetime media table paste help wordcount imagetools styleselect
              `,
          toolbar:
            `fontsizeselect formatselect styleselect | bold italic underline strikethrough | ` +
            `forecolor backcolor | alignleft aligncenter alignright alignjustify | ` +
            `bullist numlist outdent indent | undo redo | link image | removeformat | help`,
          fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
          toolbar_mode: "wrap",
          content_css: false,
          content_style: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.4;
    margin: 0;
    padding: 0;
  }

  p, div {
    margin: 0 0 0 0;
    line-height: 1;
  }
            .fw-light { font-weight: 300 !important; }
            .fw-normal { font-weight: 400 !important; }
            .fw-medium { font-weight: 500 !important; }
            .fw-semibold { font-weight: 600 !important; }
            .fw-bold { font-weight: 700 !important; }
            .fw-bolder { font-weight: 800 !important; }
          `,
          style_formats: [
            {
              title: "Font Weight",
              items: [
                { title: "Light (300)", inline: "span", classes: "fw-light" },
                { title: "Normal (400)", inline: "span", classes: "fw-normal" },
                { title: "Medium (500)", inline: "span", classes: "fw-medium" },
                {
                  title: "Semi-bold (600)",
                  inline: "span",
                  classes: "fw-semibold",
                },
                { title: "Bold (700)", inline: "span", classes: "fw-bold" },
                { title: "Bolder (800)", inline: "span", classes: "fw-bolder" },
              ],
            },
          ],
          /* Cấu hình upload hình ảnh */
          image_advtab: true,
          automatic_uploads: true,
          file_picker_types: "image",
          images_upload_handler: async (blobInfo, progress) => {
            if (uploadHandler) {
              // Sử dụng upload handler tùy chỉnh nếu được cung cấp
              return await uploadHandler(blobInfo, progress);
            } else {
              // Mặc định chuyển đổi hình ảnh sang base64
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blobInfo.blob());
              });
            }
          },
          /* Tùy chọn cho phép chọn file từ máy tính */
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = () => {
                const file = input.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                  const id = "blobid" + new Date().getTime();
                  const blobCache = editorRef.current.editorUpload.blobCache;
                  const base64 = reader.result.split(",")[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  callback(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            }
          },
        }}
      />
      {onSave && (
        <div className="mt-3 text-right">
          <ButtonSuccess
            onClick={handleSave}
            content="Lưu nội dung"
          ></ButtonSuccess>
        </div>
      )}
    </div>
  );
};
