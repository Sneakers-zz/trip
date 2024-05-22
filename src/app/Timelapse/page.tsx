"use client"
import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import type { FileObject } from '@supabase/storage-js/dist/module/lib/types';
import Image from 'next/image';

// Ensure environment variables are set and accessible on the client side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const bucketName = "Trip_ESP32_pic";  // Replace with your actual bucket name

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const listFiles = async (): Promise<{ name: string, url: string }[]> => {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list('');

    if (error) {
      throw error;
    }

    const filesWithUrls = await Promise.all(
      data.map(async (file) => {
        const { data: signedData, error: signedError } = await supabase.storage.from(bucketName).createSignedUrl(file.name, 60);
        if (signedError) {
          throw signedError;
        }
        return {
          name: file.name,
          url: signedData.signedUrl,
        };
      })
    );

    return filesWithUrls;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

const FileList: React.FC = () => {
  const [files, setFiles] = useState<{ name: string, url: string }[]>([]);

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
    <h1 className="text-2xl font-bold mb-4">File List</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {files.map(file => (
        <div key={file.name} className="text-center">
          <Image src={file.url} alt={file.name} width={200} height={200} className="mx-auto" />
          <p className="mt-2 text-sm">{file.name}</p>
        </div>
      ))}
    </div>
  </div>
);
};

export default FileList;
