import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    // Image sizes for image files (only applied to images)
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    // Allow both images and videos
    mimeTypes: ["image/*", "video/*"],
    // File size validation will be handled in hooks
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        // Check file size for videos (20MB limit)
        if (req.file && req.file.mimetype?.startsWith('video/')) {
          const maxVideoSize = 20 * 1024 * 1024; // 20MB in bytes
          if (req.file.size > maxVideoSize) {
            throw new Error('Video file size must be less than 20MB');
          }
        }
        
        // Check file size for images (5MB limit)
        if (req.file && req.file.mimetype?.startsWith('image/')) {
          const maxImageSize = 5 * 1024 * 1024; // 5MB in bytes
          if (req.file.size > maxImageSize) {
            throw new Error('Image file size must be less than 5MB');
          }
        }
        
        return data;
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      admin: {
        description: "Alt text for images, or description for videos",
      },
    },
    {
      name: "caption",
      type: "text",
      admin: {
        description: "Optional caption for the media file",
      },
    },
    {
      name: "mediaType",
      type: "select",
      options: [
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Video",
          value: "video",
        },
      ],
      admin: {
        readOnly: true,
        description: "Automatically detected based on file type",
      },
      hooks: {
        beforeChange: [
          ({ req }) => {
            if (req.file) {
              return req.file.mimetype?.startsWith('video/') ? 'video' : 'image';
            }
            return undefined;
          },
        ],
      },
    },
  ],
}
