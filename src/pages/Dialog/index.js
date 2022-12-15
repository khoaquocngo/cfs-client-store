import { Box } from '@mui/system';

const { Dialog } = require('@mui/material');
const { CONFIG_THEME } = require('config/constant');

const DiaglogSuccess = ({ open, handleClose, uuid = 'SANTAOLALA' }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 'unset',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          borderRadius: CONFIG_THEME.borderRadius,
        }}
      >
        <Box
          sx={{
            backgroundColor: CONFIG_THEME.color.blue400,
            width: 'fit-content',
            padding: '3px',
            borderRadius: CONFIG_THEME.borderRadius,
            '@media (max-width: 600px)': {
              display: 'none',
              '& img': {
                width: '200px',
              },
            },
          }}
        >
          <img
            src='/images/success.jpg'
            style={{
              width: '250px',
              maxWidth: '250px',
              borderRadius: CONFIG_THEME.borderRadius,
            }}
            alt=''
          />
        </Box>
        <Box
          sx={{
            color: CONFIG_THEME.color.blue900,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: '10px',
              fontStyle: 'italic',
              mb: 1,
            }}
          >
            Gửi điều ước thành công !!
          </Box>
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: '36px',
              fontStyle: 'italic',
              '@media (max-width: 600px)': {
                fontSize: '24px',
                wordBreak: 'break-all',
                textAlign: 'center',
              },
            }}
          >
            {uuid}
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              mt: 4,
              fontSize: '18px',
              '@media (max-width: 600px)': {
                fontSize: '12px',
                mt: 2,
              },
            }}
          >
            Bạn hãy giữ lấy mã này, và quay lại đây <br /> vào đúng đêm giáng
            sinh để đón điều bất ngờ!!
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DiaglogSuccess;
