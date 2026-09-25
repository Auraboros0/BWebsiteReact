import fs from "node:fs";
import { readdir } from "node:fs/promises";
import { rename, unlink } from "node:fs/promises"
import path from "node:path";
import { fileURLToPath } from "url";

import { VideoRecord } from "./VideoRecord.ts";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const wideFolder = path.resolve(dirname, "../../media/Player_Uploads/16x9");
const longFolder = path.resolve(dirname, "../../media/Player_Uploads/9x16");
const bufferFolderWide = path.resolve(dirname, "../../media/buffer/16x9");
const bufferFolderLong = path.resolve(dirname, "../../media/buffer/9x16");


let wideFilenames = (await readdir(wideFolder));
let longFilenames = (await readdir(longFolder));
let bWideFilenames = (await readdir(bufferFolderWide));
let bLongFilenames = (await readdir(bufferFolderLong));

export async function generateVideoRecord() {
    wideFilenames = (await readdir(wideFolder));
    longFilenames = (await readdir(longFolder));
    const objectName = "VideoRecord";
    const objectPath: string = path.resolve(dirname, `./${objectName}.ts`)
    const vidRecord: Record<string, [string[], string[]]> = {};
    for (const wide of wideFilenames) {
        const name = wide.split(/[_.]/).at(0);
        if (typeof vidRecord[name!] !== "undefined") {
            vidRecord[name!]![0]?.push(wide);
        } else {
            vidRecord[name!] = [[], []];
            vidRecord[name!]![0]?.push(wide);
        }
    }
    for (const long of longFilenames) {
        const name = long.split(/[_.]/).at(0);
        if (typeof vidRecord[name!] !== "undefined") {
            vidRecord[name!]![1]?.push(long);
        } else {
            vidRecord[name!] = [[], []];
            vidRecord[name!]![1]?.push(long);
        }
    }

    const objectContents = `export const ${objectName}: Record<string, [string[], string[]]> = ${JSON.stringify(vidRecord, null, 4)}`
    fs.writeFileSync(objectPath, objectContents);
    return vidRecord;
}

async function moveVideo(
    filename: string,
    wide: boolean
) {
    const folder = wide ? bufferFolderWide : bufferFolderLong;
    const destinationFolder = wide ? wideFolder : longFolder;
    const source = path.join(folder, filename);
    const destination = path.join(
        destinationFolder,
        filename
    );

    await rename(source, destination);
}

async function unlinkVideo(
    filename: string,
    wide: boolean
) {
    const folder = wide ? bufferFolderWide : bufferFolderLong;
    const destinationFolder = wide ? wideFolder : longFolder;
    const destination = path.join(
        destinationFolder,
        filename
    );
    await unlink(destination);
}

export async function addVideo(memory: Record<string, [string[], string[]]>, filename: string, wide: boolean) {
    const name = filename.split(/[_.]/).at(0);
    if (typeof memory[name!] === "undefined") {
        memory[name!] = [[], []];
    }
    if (wide) {
        moveVideo(filename, true);
        memory[name!]![0].push(filename);
    } else {
        moveVideo(filename, false);
        memory[name!]![1].push(filename);
    }
}

export async function deleteVideo(memory: Record<string, [string[], string[]]>, filename: string, wide: boolean) {
    const name = filename.split(/[_.]/).at(0);
    const idx = parseInt(filename.split(/[_.]/).at(1) ?? '0');
    if (typeof memory[name!] === "undefined") {
        return;
    }
    if (wide) {
        unlinkVideo(filename, true);
        memory[name!]![0].splice(idx, 1);
    } else {
        unlinkVideo(filename, false);
        memory[name!]![1].splice(idx, 1);
    }
}

export async function getFilenames(name: string, memory?: Record<string, [string[], string[]]>) {
    if (typeof memory !== "undefined") {
        if (typeof memory[name] !== "undefined") {
            return memory[name];
        } else {
            return [[], []]
        }
    } else {
        const VideoRecord = await import('./VideoRecord.ts');
        if (typeof VideoRecord.VideoRecord[name] !== "undefined") {
            return VideoRecord.VideoRecord[name];
        } else {
            return [[], []]
        }
    }
}