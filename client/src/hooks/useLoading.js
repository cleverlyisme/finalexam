import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return {
    isLoading,
    setIsLoading,
    isCreating,
    setIsCreating,
    isUpdating,
    setIsUpdating,
    isDeleting,
    setIsDeleting,
  };
};

export default useLoading;
