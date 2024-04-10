import { useForm } from '@mantine/form';
import { useInputState } from '@mantine/hooks';

export const useAddUserModalHooks = () => {
  const [isDead, setIsDead] = useInputState(false);
  const addUserForm = useForm({
    initialValues: {
      fullName: '',
      sex: 'M',
      youngGirlName: '',
      birthDate: null,
      deathDate: null,
      relation: '',
    },
    validateInputOnBlur: true,
  });

  const addUser = ({ name, youngGirlName, sex, birthDate, deathDate }) => {
    // console.log({ name, youngGirlName, sex, birthDate, deathDate });
  };

  return {
    addUserForm,
    addUser,
    isWoman: addUserForm.values.sex === 'F',
    isDead,
    setIsDead,
  };
};
