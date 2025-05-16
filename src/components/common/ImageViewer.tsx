import { FC, JSX } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

interface IimageViewerProps {
  trigger: JSX.Element;
  title: string;
  description?: string;
  image: string;
  folderName: string;
};

const ImageViewer: FC<IimageViewerProps> = ({ trigger, title, description, folderName, image }) => {

  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-center mb-2">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="border border-dashed rounded-sm" >
          <div className="flex flex-col justify-center items-center max-h-96 overflow-x-auto custom-scrollbar">
            <div className="w-full h-full">
              <img
                src={`https://${bucketName}.s3.amazonaws.com/${folderName}/${image}`}
                alt="Profile picture"
              />
            </div>
          </div>
        </div>
      </DialogContent >
    </Dialog >
  );
};

export default ImageViewer