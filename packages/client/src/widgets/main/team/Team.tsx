import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

const team = [
  { name: 'Artur Asadullin', link: 'https://t.me/Kakbutos' },
  { name: 'Polina Shumilina', link: 'https://t.me/shumpolinaa' },
  { name: 'Egor Shashurin', link: 'https://t.me/Egor_Shashurin' },
  { name: 'Oksana Belysheva', link: 'https://t.me/oksbelysheva' },
];

export const Team = () => {
  return (
    <>
      <Typography sx={{ fontSize: 18, textAlign: 'center', mb: 3 }}>
        Команда разработки:
      </Typography>
      <Grid container justifyContent={'center'} spacing={4}>
        {team.map((member, i) => (
          <Grid item key={i}>
            <Card
              variant="outlined"
              sx={{
                borderWidth: 2,
                borderColor: theme => theme.palette.text.secondary,
              }}>
              <CardContent sx={{ pb: 1 }}>
                <Typography sx={{ fontSize: 18, textAlign: 'center' }}>
                  {member.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  size="small"
                  href={member.link}
                  target="_blank">
                  Написать
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
