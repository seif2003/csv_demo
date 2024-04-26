"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { z } from "zod";
import { Select, Option } from "@material-tailwind/react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

interface TableProps {
    csvFile: File;
    delimiter: string;
}

interface Attribute {
    name: string;
    type: string;
}

const attributes: Attribute[] = [
    { name: 'name', type: 'string' },
    { name: 'created_at', type: 'Date' },
    { name: 'age', type: 'number' },
];


const FormSchema = z.object({
  selectedAttributes: z.array(z.string()),
});


const TableCSV: React.FC<TableProps> = ({ csvFile , delimiter }) => {
    const [data, setData] = useState<string[][]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsText(csvFile);
        reader.onload = () => {
            const csv = reader.result as string;
            const rows = csv.split('\n');
            const tableData = rows.map(row => row.split(delimiter));
            setData(tableData);
        };
    }, [csvFile]);

    useEffect(() => {
        setIsValid(selectedAttributes.every((attribute, index) => checkType(index) && attribute !== ''));
    }, [selectedAttributes]);

    const handleSelectChange = (index: number, value: string) => {
        const newSelectedAttributes = [...selectedAttributes];
        newSelectedAttributes[index] = value;
        setSelectedAttributes(newSelectedAttributes);
    };

    const checkType = (index: number) => {
        const attribute = attributes.find(attr => attr.name === selectedAttributes[index]);
        if (!attribute) return true;
        for (let i = 1; i < data.length; i++) {
            if (attribute.type === 'number' && isNaN(Number(data[i][index]))) {
                return false;
            }
            if (attribute.type === 'Date' && isNaN(Date.parse(data[i][index]))) {
                return false;
            }
        }
        return true;
    };

    // Check if selected attributes are not repeated
    const checkAttributes = (index: number) => {
        const attribute = selectedAttributes[index];
        return selectedAttributes.filter(attr => attr === attribute).length === 1;
    };

    const saveBackend = () => {
        if (isValid && selectedAttributes.every((_, index) => checkAttributes(index))){
            let dataObj = [];
            for (let i = 1; i < data.length; i++) {
                let obj: { [key: string]: any } = {};
                for (let j = 0; j < data[i].length; j++) {
                    obj[selectedAttributes[j]] = data[i][j];
                }
                dataObj.push(obj);
            }
            console.log(dataObj);
        } else {
            alert('Please select valid attributes for all columns.');
        }
    }

    return (
        <div className='w-full text-center mx-9'>
                <Table className="bg-white w-full rounded-[7px]">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow className="h-11 rounded-lg p-0 ">
                        {data.length > 0 &&
                            data[0].map((_, index) => (
                            <TableHead key={index}>
                                <select
                                value={selectedAttributes[index]}
                                onChange={(e) => handleSelectChange(index, e.target.value)}
                                className={`${checkType(index) ? 'bg-[#DBE7FF]' : 'bg-red-100 text-red-600'} border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-full w-full`}
                                >
                                <option value="">Select attribute</option>
                                {attributes.map((attribute, idx) => (
                                    <option key={idx} value={attribute.name} className='h-11 bg-white text-black'>
                                    {attribute.name}
                                    </option>
                                ))}
                                </select>
                            </TableHead>
                            ))}
                        </TableRow>
                        <TableRow className="bg-[#DBE7FF] h-11">
                        {data.length > 0 &&
                            data[0].map((header, index) => (
                            <TableHead key={index}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 &&
                        data.slice(1).map((row, index) => (
                            <TableRow key={index} className="h-11 border-b-[1px] border-[#BFBFBF]">
                            {row.map((cell, index) => (
                                <TableCell
                                className={index !== row.length - 1 ? 'h-11 border-r-[1px] border-[#BFBFBF]' : 'h-11'}
                                key={index}
                                >
                                {cell}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            <Button onClick={saveBackend}>Save</Button>
        </div>
    );
};

export default TableCSV;
