"use client"
import React, { useState } from 'react';
import FromFile from '@/components/FromFile';
import TableCSV from '@/components/TableCSV'; 
import { Button } from '@/components/ui/button';

const CsvPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isFileSent, setIsFileSent] = useState(false); 
    const [delimiter, setDelimiter] = useState<string>(',');

    const handleSend = () => {
        setIsFileSent(true); 
    };

    return (
        <div className='w-[100vw] h-[100vh] items-center justify-center flex'>
            {isFileSent && file ? <TableCSV csvFile={file} delimiter={delimiter}/> : <div className="flex flex-col gap-4">
                <FromFile file={file} setFile={setFile} setDelimiter={setDelimiter} delimiter={delimiter}/>
                <Button className='py-2 bg-[#141552] text-[#DBE7FF] text-center rounded-[7px] cursor-pointer hover:bg-[#1C1C72] font-medium text-[14px] shadow-lg' value="Upload" disabled={file === null || !delimiter} onClick={handleSend}> Next</Button>
            </div>}
        </div>
    );
};

export default CsvPage;