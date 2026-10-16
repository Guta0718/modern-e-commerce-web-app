'use client';

import { Product } from "@/types";
import { getProducts } from "@/features/products/api";
import { Card,CardContent,CardTitle } from "./ui/card";
import { useEffect,useState } from "react";
import Image from "next/image";
import { Layout } from "lucide-react";

interface Props{
    products:Product[];
}

export const Carousel=({ products }:Props)=>{
    const[current,setCurrent]=useState<number>(0);

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrent((prev)=>(prev + 1) % products.length);
        },4000);
        return()=> clearInterval(interval);

    },[products.length])

    const currentProduct=products[current];

    return(
<Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
    {currentProduct.images && currentProduct.images[1] && (
        <div className="relative h-80 w-full">
            <Image 
            alt={currentProduct.title} 
            src={currentProduct.images[1] }
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
            />
        </div>
    )}
    <CardContent className="absolute inset-0 flex flex col items-center justify-center">
        <CardTitle className="text-3xl font-bold text-white mb-2"> 
            {currentProduct.title} 
        </CardTitle>
    </CardContent>
</Card>
    )
}