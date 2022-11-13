import { Dispatch, SetStateAction, useCallback, useState } from "react"

// interface UserInputProps{
//     value: string;
//     onChangeForm: (e: ChangeEvent) => void;
//     setValue: React.Dispatch<SetStateAction<string>>;
// }

const useInput = (initialValue: string): [string, Dispatch<SetStateAction<string>>, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(initialValue);
    const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);
    return [value, setValue, onChangeForm];
};

export default useInput;