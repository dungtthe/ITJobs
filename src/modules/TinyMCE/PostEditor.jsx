import React from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function PostEditor() {
  return (
    <Editor
      apiKey="pib4lsgj16ujj516suugks5ofwgybghru0yejb66deqarvc3" //free nên không cần sợ
      init={{
        height: 600,
        menubar: true,
        plugins: `
            advlist autolink lists link image charmap preview anchor
            searchreplace visualblocks code fullscreen
            insertdatetime media table paste help wordcount
          `,
        toolbar:
          `fontsizeselect formatselect | bold italic underline strikethrough | ` +
          `forecolor backcolor | alignleft aligncenter alignright alignjustify | ` +
          `bullist numlist outdent indent | undo redo | link image | removeformat | help`,
        fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
        toolbar_mode: "wrap",
        //Style mặc định
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
