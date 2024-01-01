import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryBtnProps {
  text?: string;
  className?: string;
  color?: string; // Allow any string for color
}

const CategoryBtn: React.FC<CategoryBtnProps> = ({
  text = 'Default Text',
  className = '',
  color = 'blue-500', // Provide a default Tailwind color class
}) => {
  // Determine the base background color class based on the color prop
  const baseBgColorClass = `bg-${color}`;
  // Determine the hover background color class, assuming you have a darker variant for each color
  const hoverBgColorClass = `hover:${baseBgColorClass}-dark`; // Replace '-dark' with the correct darker variant

  return (
      <Button 
        variant="outline" 
        size="sm" 
        className={cn(
          "mr-2 border-transparent text-white rounded-lg shadow-md focus:outline-none",
          baseBgColorClass,
          hoverBgColorClass,
          className
        )} 
      >
        {text}
      </Button>
  );
};

export default CategoryBtn;
