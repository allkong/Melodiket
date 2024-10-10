'use client';

import { ChangeEvent, ForwardedRef, forwardRef, useRef, useState } from 'react';

interface FileInputProps {
  onChange?: (cid: string | null) => void;
  onBlur?: () => void;
  value?: string;
}

const FileInput = forwardRef(
  (
    { onChange, onBlur }: FileInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setFileName(file ? file.name : null);

      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const ipfsUrl = process.env.NEXT_PUBLIC_IPFS_URL ?? '';
          const response = await fetch(ipfsUrl, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            const cid = result.cid || null;
            if (onChange) {
              onChange(cid);
            }
          } else {
            console.error('파일 업로드 실패:', response.statusText);
          }
        } catch (error) {
          console.error('파일 업로드 중 오류 발생:', error);
        }
      }
    };

    const handleIconClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    return (
      <div className="relative w-full">
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          onChange={handleChange}
          onBlur={onBlur}
          className="absolute w-0 h-0 p-0 overflow-hidden border-0"
        />

        <div className="w-full h-12 pl-5 pr-10 text-base bg-white border outline-none rounded-2xl placeholder:text-gray-200 flex items-center justify-between">
          <span className="text-gray-400">
            {fileName ? fileName : '파일 선택'}
          </span>
          <div
            className="cursor-pointer z-10 bg-no-repeat bg-center w-6 h-6"
            style={{
              backgroundImage: "url('/icons/upload.svg')",
            }}
            onClick={handleIconClick}
          />
        </div>
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export default FileInput;
