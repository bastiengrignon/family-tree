import { useEffect, useRef, useState } from 'react';

export const useConditionalInputHooks = ({ name, onSave }) => {
  const ref = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(name);

  const save = () => {
    setIsEditing(false);
    onSave(inputName);
  };

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
    }
  }, [isEditing, ref]);

  useEffect(() => {
    setInputName(name);
  }, [name]);

  return {
    isEditing,
    setIsEditing,
    inputName,
    setInputName,
    save,
    ref,
  };
};
