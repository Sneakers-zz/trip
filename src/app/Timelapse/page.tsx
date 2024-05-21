"use client"
import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import type { FileObject } from '@supabase/storage-js/dist/module/lib/types'; // Import the correct FileObject type

// Ensure environment variables are set and accessible on the client side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const bucketName = "Trip_ESP32_pic";  // Replace with your actual bucket name

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const listFiles = async (): Promise<FileObject[]> => {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list('');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

const FileList: React.FC = () => {
  const [files, setFiles] = useState<FileObject[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await listFiles();
        setFiles(files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles().catch(error => {
      console.error('Error in fetchFiles:', error);
    });
  }, []);

  return (
    <div>
      <h1>File List</h1>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
