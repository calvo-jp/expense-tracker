import {v2 as cloudinary} from 'cloudinary';
import assert from 'node:assert';

assert(process.env.CLOUDINARY_API_KEY);
assert(process.env.CLOUDINARY_API_SECRET);
assert(process.env.CLOUDINARY_CLOUD_NAME);
assert(process.env.CLOUDINARY_FOLDER);

cloudinary.config({
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export function uploadFile(file: File) {
	/* logic */
}
