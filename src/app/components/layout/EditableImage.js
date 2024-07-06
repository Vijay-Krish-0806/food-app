import Image from 'next/image';
import React from 'react'
import { toast } from 'react-toastify';

const EditableImage = ({ link, setLink, savingPic, setSavingPic }) => {
    async function postDetails(e) {
        const pics = e.target.files[0];
        console.log('Pic uploading');
        if (pics === undefined) {
            toast.error('Please select an image');
            return;
        }
        if (
            pics.type === 'image/jpeg' ||
            pics.type === 'image/png' ||
            pics.type === 'image/jpg'
        ) {
            setSavingPic('Uploading...');
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'chat_app');
            data.append('cloud_name', 'dkybtcweu');
            try {
                const cloudinaryRes = await fetch('https://api.cloudinary.com/v1_1/dkybtcweu/image/upload', {
                    method: 'POST',
                    body: data,
                });
                const cloudinaryData = await cloudinaryRes.json();
                const imageUrl = cloudinaryData.url.toString();
                setLink(imageUrl);
                setSavingPic('Uploaded');
                toast.success('Pic uploaded successfully');
                setSavingPic('Edit Avatar')
            } catch (error) {
                console.error('Error uploading pic:', error);
                toast.error('Error uploading pic. Please try again.');
            }
        } else {
            toast.error('Please select an image');
        }
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            {link && (<Image className="rounded-lg mb-1" src={link} width={200} height={200} alt='avatar' />)}
            {!link && (
                <div className='bg-gray-200 p-4 text-gray-400 rounded-lg mb-2'>No image ☹️ </div>
            )}

            <label className='m-4'>
                <input onChange={postDetails} type='file' className="hidden" />
                <span className="text-gray-500 font-semibold border px-2 rounded cursor-pointer border-black" >{savingPic}</span>
            </label>
        </div>
    )

}

export default EditableImage

