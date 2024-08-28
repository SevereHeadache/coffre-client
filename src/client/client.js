import axios from 'axios';
import { toast } from 'vue3-toastify';

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast(
      error.response?.data?.message ?? 'Error',
      { type: 'error' },
    );

    throw error;
  },
);

function getDocuments() {
  return client.get('/storage');
}

function getDocumentContents(path) {
  return client.get('/storage/' + path);
}

function saveDocument(path, content = null, overwrite = null) {
  const data = {};
  if (content !== null) {
    data.content = content;
  }
  if (overwrite !== null) {
    data.overwrite = overwrite;
  }

  return client.post('/storage/' + path, data);
}

function renameDocument(path, newName) {
  return client.patch(
    '/storage/' + path,
    newName ? { name: newName } : {},
  );
}

function deleteDocument(path) {
  return client.delete('/storage/' + path);
}

export {
  getDocuments,
  getDocumentContents,
  saveDocument,
  renameDocument,
  deleteDocument,
};
