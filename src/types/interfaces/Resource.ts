import { ResourceType } from "@/types";

export interface Resource {
  title: string;
  type?: ResourceType;
  fileExtension: string;
  url: string;
}

export interface ResourceUpload {
  id: string;
  type: ResourceType;
  value: string;
  file?: File;
  preview?: string;
  fileType?: string;
  cloudinaryUrl?: string;
  cloudinaryTitle?: string;
  cloudinaryFileExtension?: string;
}
