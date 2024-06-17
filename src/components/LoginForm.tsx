import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, TextField, Box, Button } from "@mui/material";

export interface LoginFormFieldsType {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginFormProps {
  onSubmit: (data: LoginFormFieldsType) => void;
  onCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onCancel }) => {
  const { handleSubmit, control, reset } = useForm<LoginFormFieldsType>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: LoginFormFieldsType) => {
    onSubmit(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="filled"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
          <Button variant="outlined" onClick={handleCancel} fullWidth>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
