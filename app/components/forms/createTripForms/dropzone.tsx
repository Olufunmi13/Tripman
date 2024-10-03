'use client';
import { Group, Text, SimpleGrid, Image } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';

interface DropZoneProps extends Omit<DropzoneProps, 'onChange' | 'onDrop'> {
  onChange: (files: FileWithPath[]) => void; // Define onChange
  currentFiles: FileWithPath[];
}

export function DropZone({ onChange, ...props }: DropZoneProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        width={200}
        height={200}
      />
    );
  });

  // Define a separate onDrop handler
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onChange(acceptedFiles); // Call the onChange prop with accepted files
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
      maxFiles={1}
      {...props} // Spread other props without overwriting onDrop
    >
      <Group justify="center" gap="xl" mih={120} style={{ pointerEvents: 'none' }}>
        <Text size="xl" inline className="text-center">
          Drag images here or click to select files
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
          {previews}
        </SimpleGrid>
      </Group>
    </Dropzone>
  );
}

