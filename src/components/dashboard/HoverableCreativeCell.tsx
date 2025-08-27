import { useState } from "react";
import { TableCell } from "@/components/ui/table";

interface HoverableCreativeCellProps {
  creativeName: string;
  creativeUrl?: string;
  previewImage?: string;
}

export const HoverableCreativeCell = ({ 
  creativeName, 
  creativeUrl, 
  previewImage 
}: HoverableCreativeCellProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleClick = () => {
    if (creativeUrl) {
      window.open(creativeUrl, '_blank');
    }
  };

  return (
    <TableCell 
      className="font-medium relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <button
        onClick={handleClick}
        className={`text-left hover:text-primary hover:underline transition-colors ${
          creativeUrl ? 'cursor-pointer' : 'cursor-default'
        }`}
        disabled={!creativeUrl}
      >
        {creativeName}
      </button>
      
      {showPreview && previewImage && (
        <div className="absolute z-50 bg-card border border-border rounded-lg shadow-lg p-2 -top-2 left-full ml-2 w-64">
          <img
            src={previewImage}
            alt={`Preview de ${creativeName}`}
            className="w-full h-auto rounded max-h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="text-xs text-muted-foreground mt-1 text-center">
            {creativeName}
          </div>
        </div>
      )}
    </TableCell>
  );
};