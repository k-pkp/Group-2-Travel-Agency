import React from 'react';
import { Button } from "@/components/ui/button";

// Interface defining the props expected for the EditButton component
interface EditButtonProps {
  isAdmin: boolean;
  isEditorMode: boolean;
  onToggleEditorMode: () => void;
}

// Functional component definition for the EditButton
const EditButton: React.FC<EditButtonProps> = ({ isAdmin, isEditorMode, onToggleEditorMode }) => {
  if (!isAdmin) return null;
  
  return (
    <Button
      className="bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer px-4 py-2 rounded-md"
      onClick={onToggleEditorMode}
    >
      {isEditorMode ? "Exit Edit Mode" : "Edit Listings"}
    </Button>
  );
};

export default EditButton;