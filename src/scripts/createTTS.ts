import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

export async function createTTSFile(filename: string): Promise<void> {
    if (fs.existsSync(filename)) {
        return
    }

    const text = path.basename(filename, path.extname(filename));
    const url = `https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(text)}`;
    const basename = path.basename(filename);
    try {
        const response = await axios.get<ArrayBuffer>(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(basename, Buffer.from(response.data))

        if (!fs.existsSync(path.dirname(filename))) {
            fs.mkdirSync(path.dirname(filename), { recursive: true });
        }

        exec(`ffmpeg -y -i ${basename} -af "volume=3.5, atempo=1.5" -write_xing 0 -loglevel quiet "${filename}"`,
            (err) => {
                if (err) {
                    console.error(`Error processing ${filename}:`, err);
                } else {
                    fs.unlinkSync(basename); // Remove the original file
                    console.log(`Created ${filename}`);
                }
            }
        );
    } catch (error) {
        console.error(`Error while creating ${filename}:`, error);
    }
}