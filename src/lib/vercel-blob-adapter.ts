import { put, del } from '@vercel/blob'

interface VercelBlobAdapterArgs {
  token: string
  folder?: string
}

interface FileData {
  data: Buffer
  mimetype: string
  name: string
  size: number
  width?: number
  height?: number
}

interface UploadedFile {
  filename: string
  mimeType: string
  filesize: number
  width?: number
  height?: number
  url: string
}

export const vercelBlobAdapter = ({
  token,
  folder = 'uploads',
}: VercelBlobAdapterArgs) => {
  return {
    name: 'vercel-blob',
    
    async uploadFile(file: FileData, filename: string): Promise<UploadedFile> {
      try {
        const timestamp = Date.now()
        const randomSuffix = Math.random().toString(36).substring(2, 15)
        const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
        const finalFilename = `${folder}/${timestamp}-${randomSuffix}-${cleanFilename}`

        const blob = await put(finalFilename, file.data, {
          access: 'public',
          token,
        })

        return {
          filename: finalFilename,
          mimeType: file.mimetype,
          filesize: file.size,
          width: file.width,
          height: file.height,
          url: blob.url,
        }
      } catch (error) {
        console.error('Error uploading to Vercel Blob:', error)
        throw new Error('Failed to upload file to Vercel Blob Storage')
      }
    },

    async deleteFile(filename: string): Promise<void> {
      try {
        await del(filename, { token })
      } catch (error) {
        console.error('Error deleting from Vercel Blob:', error)
        // Don't throw error for delete failures to prevent blocking other operations
      }
    },

    generateURL(filename: string): string {
      // For Vercel Blob, we store the full URL, so we can return it directly
      return filename.startsWith('http') ? filename : `https://blob.vercel-storage.com/${filename}`
    },
  }
}
