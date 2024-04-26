"use client"
import React, { useEffect, useState} from 'react';
import { Input } from './ui/input';


type Props = {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    delimiter: string;
    setDelimiter: React.Dispatch<React.SetStateAction<string>>;
};


function Svg1() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M14.6663 7.5V11.25C14.6663 15 13.333 16.5 9.99967 16.5H5.99967C2.66634 16.5 1.33301 15 1.33301 11.25V6.75C1.33301 3 2.66634 1.5 5.99967 1.5H9.33301" stroke="#1D1DCE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.6663 7.5H11.9997C9.99967 7.5 9.33301 6.75 9.33301 4.5V1.5L14.6663 7.5Z" stroke="#1D1DCE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.66699 9.75H8.66699" stroke="#1D1DCE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.66699 12.75H7.33366" stroke="#1D1DCE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}



const FromFile: React.FC<Props> = (props) => {

    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            props.setFile(selectedFile);
        }
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', 'div');
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length === 1 && files[0].type === 'text/csv') {
            props.setFile(files[0]);
            setDragOver(false);
            console.log(files[0]);
        }
        else if (files[0].type !== 'text/csv') {
            console.log('Invalid file type!');
            setDragOver(false);
        }
    };

    return (
        <div className='select-none'>
        <div
            className='gap-6 select-text h-[470px] w-[350px] rounded-[8px] px-5 py-[26px] flex items-center justify-cente bg-white flex-col justify-center shadow-2xl'
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={() => setDragOver(false)}
        >
            {dragOver ? <p>Drop file here</p> : 
            <>
                <div className='flex flex-row gap-2'>
                    <div className='w-6 h-6 flex items-center justify-center rounded-[5px] bg-[#DBE7FF]'>
                        <Svg1/>
                    </div>
                    <p className='font-semibold text-[16px] '>From file</p>
                </div>
                <div className='text-center'>
                <p>Drag and drop your file here.</p>
                <p>-  or  -</p>
                </div>
                <div className='w-full flex items-center justify-center flex-col h-9'>
                    <label htmlFor="file" className='w-44 py-2 bg-[#DBE7FF] text-[#141552] text-center rounded-[7px] cursor-pointer hover:bg-[#BFCFEF] font-medium text-[14px] overflow-x-hidden overflow-y-hidden'>{props.file ? props.file.name : 'Browse'}</label>
                    <input className="invisible h-0" type="file" accept=".csv" id="file" onChange={handleFileChange} />
                </div>
                <p>Download sample file CSV</p>
                <p>You can import up to 1000 records through an .csv file. To import more than 1000 records at a time, use a .csv file.</p>
                <div className='w-fit'>
                    <p className={`text-[#3D475C] font-medium ${props.delimiter === '' ? 'text-[#FF0000]' : ''}`}>Delimiter</p>
                    <Input 
                        id="delimiter" 
                        defaultValue="," 
                        className={`h-10 ${props.delimiter === '' ? 'border-[1px] border-[#FF0000]' : ''}`} 
                        maxLength={1} 
                        onChange={(e) => props.setDelimiter(e.target.value)}
                    />
                </div>
            </>}
        </div>
        </div>
    );
};

export default FromFile;