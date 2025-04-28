import { toast as sonnerToast } from "sonner";

// Simple wrapper around sonner's toast function for backward compatibility
export const toast = (props: { 
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
}) => {
  const { title, description, variant, action } = props;
  
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
      action
    });
  }
  
  return sonnerToast(title, {
    description,
    action
  });
};

// Keep the useToast hook for backward compatibility
export const useToast = () => {
  return {
    toast,
    toasts: [], // This is not used by Sonner but kept for API compatibility
    dismiss: sonnerToast.dismiss
  };
};