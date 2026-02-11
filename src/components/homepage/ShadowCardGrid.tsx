import data from '@/utils/Data/shadow.json';
import { useState } from 'react';

export default function ShadowCardGrid() {
  const shadows = data as { id: number; name: string; code: string; categories: string[] }[];
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(`box-shadow: ${code};`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };



  return (
    <div className="container py-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 bg-[#F5F5F5] p-5 rounded-3xl">
        {shadows.map((shadow) => (
          <div
            key={shadow.id}
            onClick={() => handleCopy(shadow.code, shadow.id)}
            className="shadow-card w-full aspect-square bg-white rounded-3xl flex flex-col items-center justify-center text-secondary cursor-pointer transition-transform hover:scale-105"
            style={{ boxShadow: shadow.code }}
          >
            <span className="font-semibold">{shadow.name}</span>
            {copiedId === shadow.id && (
              <span className="text-sm text-green-500 mt-2">Copied!</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
