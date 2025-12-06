"use client";

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-300"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Blogs
    </button>
  );
}