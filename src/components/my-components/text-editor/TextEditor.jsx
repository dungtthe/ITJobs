import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ButtonSuccess } from "../button/ButtonSuccess";
import { ButtonDestructive } from "../button/ButtonDestructive";
export const TextEditor = ({
  height,
  initialValue = "",
  onSave,
  onChange,
  uploadHandler,
  handleHuy,
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
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.on("NodeChange", function (e) {
            setTimeout(() => {
              editor.execCommand("JoinParagraphs", false);
            }, 0);
          });
        }}
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
          lists_indent_on_tab: true,
          advlist_number_styles:
            "default,lower-alpha,lower-roman,upper-alpha,upper-roman",
          advlist_bullet_styles: "default,circle,square",
          lists_shared_number_context: true,
          end_container_on_empty_block: true,
          forced_root_block_attrs: {
            "data-continue-list": "true",
          },
          setup: function (editor) {
            editor.on("ExecCommand", function (e) {
              if (e.command === "InsertOrderedList") {
                setTimeout(() => {
                  const selectedNode = editor.selection.getNode();
                  const list = editor.dom.getParent(selectedNode, "ol");

                  if (list) {
                    const style = window.getComputedStyle(list);
                    const listStyleType =
                      style.getPropertyValue("list-style-type") || "decimal";
                    list.setAttribute("data-list-type", listStyleType);
                  }
                }, 10);
              }
            });

            editor.addCommand("JoinParagraphs", function () {
              const lists = editor.dom.select("ol");
              const listsByType = {};

              lists.forEach(function (list) {
                let listType = list.getAttribute("data-list-type");
                if (!listType) {
                  const style = window.getComputedStyle(list);
                  listType =
                    style.getPropertyValue("list-style-type") || "decimal";
                  list.setAttribute("data-list-type", listType);
                }

                if (!listsByType[listType]) {
                  listsByType[listType] = [];
                }
                listsByType[listType].push(list);
              });

              Object.keys(listsByType).forEach(function (type) {
                const sameTypeLists = listsByType[type];
                let currentStart = 1;

                sameTypeLists.forEach(function (list, index) {
                  if (index === 0) {
                    list.removeAttribute("start");
                  } else {
                    const prevList = sameTypeLists[index - 1];
                    const prevItems = prevList.querySelectorAll("li").length;
                    currentStart += prevItems;
                    list.setAttribute("start", currentStart);
                  }
                });
              });
            });
          },
          content_style: `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  body {
    font-family: Inter, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }
  * {
    font-family: Inter, sans-serif;
  }
  p { 
    margin: 0; 
    line-height: 1.5;
    font-family: Inter, sans-serif; 
  }
  h1 { 
    font-size: 2em; 
    font-weight: bold; 
    margin: 0.7em 0 0.5em; 
    line-height: 1.3; 
    font-family: Inter, sans-serif;
  }
  h2 { 
    font-size: 1.5em; 
    font-weight: bold; 
    margin: 0.7em 0 0.5em; 
    line-height: 1.3; 
    font-family: Inter, sans-serif;
  }
  h3 { 
    font-size: 1.3em; 
    font-weight: bold; 
    margin: 0.7em 0 0.5em; 
    line-height: 1.3; 
    font-family: Inter, sans-serif;
  }
  ul, ol { 
    margin: 0.5em 0 0.5em 2em; 
    font-family: Inter, sans-serif;
  }
  li { 
    margin: 0.3em 0; 
    font-family: Inter, sans-serif;
  }
`,

          image_advtab: true,
          automatic_uploads: true,
          file_picker_types: "image",
          images_upload_handler: async (blobInfo, progress) => {
            if (uploadHandler) {
              return await uploadHandler(blobInfo, progress);
            } else {
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blobInfo.blob());
              });
            }
          },
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
        <div className="mt-3 flex justify-end">
          <ButtonDestructive
            content="Hủy"
            onClick={handleHuy}
          ></ButtonDestructive>
          <ButtonSuccess
            className="ml-5"
            onClick={handleSave}
            content="Lưu nội dung"
          ></ButtonSuccess>
        </div>
      )}
    </div>
  );
};
