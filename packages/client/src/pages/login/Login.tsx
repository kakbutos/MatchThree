import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import styles from './login.module.scss'
import { Box } from '@mui/material'

export const LoginPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      login: data.get('login'),
      password: data.get('password'),
    })
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} className={styles.backgroundContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.backgroundImg} />
        </div>
        <div className={styles.emptyBackground} />
      </Grid>
      <Grid item xs={12} sm={8} className={styles.formContainer}>
        <form noValidate onSubmit={handleSubmit} className={styles.formFields}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Box display="flex" gap={1}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Авторизоваться
            </Button>
            <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Нет аккаунта?
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}
