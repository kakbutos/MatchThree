import { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { getResourceLink } from '@/constants';
import { useForm } from 'react-hook-form';
import { useApiCall } from '@/hooks/useApiCall';
import { userApi } from '@/services/api/user/user-api';

interface Props {
  icon: string;
  canEdit: boolean;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const AvatarForm: React.FC<Props> = ({ icon, canEdit }) => {
  const { register, handleSubmit } = useForm();
  const [changeAvatarApi, isLoading] = useApiCall(userApi.changeAvatar);
  const [iconSrc, setIconSrc] = useState(icon);
  const [showSave, setShowSave] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const onSubmit = async (data: { avatar: FileList }) => {
    if (data && data.avatar) {
      const formData = new FormData();
      formData.append('avatar', data.avatar[0] as File);
      const res = await changeAvatarApi(formData);

      if (res?.avatar) {
        setIconSrc(res.avatar);
      }
    }

    setShowSave(false);
    setShowTip(true);
  };

  useEffect(() => {
    setIconSrc(icon);
  }, [icon]);

  return (
    <Box display="flex" justifyContent="space-between">
      <Avatar
        alt="avatar"
        src={iconSrc ? getResourceLink(iconSrc) : ''}
        sx={{ width: '80px', height: '80px' }}
      />
      <Box>
        {canEdit && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}>
              Загрузите изображение
              <VisuallyHiddenInput
                ref={register}
                name="avatar"
                type="file"
                onChange={() => setShowSave(true)}
              />
            </Button>

            {showSave && (
              <Button type="submit" sx={{ marginLeft: '10px' }}>
                {isLoading ? (
                  <CircularProgress size={21} color="secondary" />
                ) : (
                  <>Сохранить</>
                )}
              </Button>
            )}
          </form>
        )}
      </Box>

      <Snackbar
        open={showTip}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={() => setShowTip(false)}
          severity="success"
          sx={{ width: '100%' }}>
          Изображение успешно загружено
        </Alert>
      </Snackbar>
    </Box>
  );
};
