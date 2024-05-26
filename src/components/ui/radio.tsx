import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Input } from './input';

type RadioProps = {
  options: {
    id: string;
    label: string;
    description?: string;
    value: string;
  }[];
  register: UseFormRegister<FieldValues>;
  fieldName: string;
};

const Radio = ({ options, register, fieldName }: RadioProps) => {
  return (
    <ul className='flex flex-col gap-4 mb-4'>
      {options.map(option => (
        <li key={option.id}>
          <Input
            id={option.id}
            type='radio'
            value={option.value}
            className='hidden peer'
            {...register(fieldName, { required: 'Must choose one option' })}
          />
          <label
            htmlFor={option.id}
            className='peer-checked:border-primary/50 flex justify-between items-center border border-border rounded-md bg-background-2 p-4 cursor-pointer tracking-tight hover:bg-muted/45 hover:border-primary/50 transition-colors'
          >
            <div>
              <h3>{option.label}</h3>
              <p className='text-muted-foreground text-sm'>
                {option.description}
              </p>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Radio;
