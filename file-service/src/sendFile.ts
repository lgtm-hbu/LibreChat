import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export async function sendFile(filePath: string) {
  const form = new FormData();

  form.append('files', fs.createReadStream(filePath));

  try {
    const response = await axios.post('http://localhost:8000/general/v0/general', form, {
      headers: {
        ...form.getHeaders(),
        Accept: 'application/json',
      },
    });

    console.log(response.data);
  } catch (error) {
    /* @ts-ignore */
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
