import SentimentSatisfiedOutlined from '@mui/icons-material/SentimentSatisfiedOutlined';
import { FormInputText, FormInputTextProps } from './FormInputText';
import data from '@emoji-mart/data';
import { useState, useRef } from 'react';
import Picker from '@emoji-mart/react';
import { InputAdornment, IconButton, Popover } from '@mui/material';

export const EmojiFormInputText: React.FC<FormInputTextProps> = ({
  name,
  control,
  ...textFieldProps
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEmojiSelect = ({ native }: { native: string }) => {
    if (inputRef.current) {
      const insertPos = inputRef.current.selectionStart;
      const prevValue = control.getValues()[name];
      const newValue = [
        prevValue.slice(0, insertPos),
        native,
        prevValue.slice(insertPos),
      ].join('');
      control.setValue(name, newValue);
    }
  };

  const toggleEmojiPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(showPicker ? null : event.currentTarget);
    setShowPicker(value => !value);
  };

  return (
    <>
      <FormInputText
        control={control}
        name={name}
        InputProps={{
          inputRef,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle emoji popover"
                onClick={toggleEmojiPicker}
                onMouseDown={toggleEmojiPicker}>
                <SentimentSatisfiedOutlined style={{ color: 'white' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
      />
      <Popover
        open={showPicker}
        onClose={toggleEmojiPicker}
        anchorEl={anchorEl}>
        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
      </Popover>
    </>
  );
};
