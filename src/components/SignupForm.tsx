import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, TextField, Box, Button } from "@mui/material";

export interface SignupFormFieldsType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface SignupFormProps {
  onSubmit: (data: SignupFormFieldsType) => void;
  onCancel: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onCancel }) => {
  const { handleSubmit, control, reset } = useForm<SignupFormFieldsType>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: SignupFormFieldsType) => {
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
          <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="filled"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="filled"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
            Create Account
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignupForm;
