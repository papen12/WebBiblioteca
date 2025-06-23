export const CONFIG={
  n8n:{
    WEBHOOK_URL:process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/imageReader'
  },
  SERVER:{
    PORT:process.env.PORT || 5000,
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'], 
    MAX_FILE_SIZE: 5 * 1024 * 1024,
     UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads/book-covers'
  }
}