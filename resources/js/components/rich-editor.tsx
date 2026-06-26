import { Editor } from '@tinymce/tinymce-react';

interface RichEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  placeholder?: string;
}

export default function RichEditor({ content, onUpdate, placeholder }: RichEditorProps) {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      value={content}
      onEditorChange={(html) => onUpdate(html)}
      init={{
        license_key: 'gpl',
        height: 400,
        menubar: false,
        placeholder: placeholder || 'Start typing...',
        plugins: 'advlist autolink lists link image code blockquote',
        toolbar:
          'blocks bold italic underline | alignleft aligncenter alignright | bullist numlist blockquote | link image | code',
        block_formats: 'Paragraph=p;Heading 2=h2;Heading 3=h3',
        images_upload_handler: (blobInfo) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            fetch('/dashboard/upload-image', {
              method: 'POST',
              headers: {
                'X-CSRF-TOKEN':
                  document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '',
              },
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.location) resolve(data.location);
                else reject('Upload failed');
              })
              .catch(() => reject('Image upload failed'));
          }),
        content_style:
          'body { font-family: inherit; font-size: 1rem; color: inherit; } img { max-width: 100%; height: auto; }',
      }}
    />
  );
}
