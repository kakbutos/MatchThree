import SentimentSatisfiedOutlined from '@mui/icons-material/SentimentSatisfiedOutlined';
import { FormInputText, FormInputTextProps } from './FormInputText';
import data from '@emoji-mart/data';
import { useState } from 'react';
import Picker from '@emoji-mart/react';
import { InputAdornment, IconButton, Popover } from '@mui/material';

export const EmojiFormInputText: React.FC<FormInputTextProps> = ({
  name,
  control,
  ...textFieldProps
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = ({ native }: { native: string }) => {
    control.setValue(name, control.getValues()[name] + native);
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
