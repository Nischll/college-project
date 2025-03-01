import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

const GenericFormDialog = ({ open, onClose, onSubmit, title, fields, cancelButton, submitButton, defaultValues }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues || {},
  });

  // Reset the form whenever defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // Reset the form after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-[#383E49] text-3xl leading-12 h-[40px] flex justify-start">{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {fields.map((field) => (
            <Controller
              key={field.id}
              name={field.id}
              control={control}
              defaultValue=""
              rules={{
                required: field.required && `${field.label} is required`,
                pattern: field.pattern && {
                  value: field.pattern,
                  message: field.errorMessage || "Invalid format",
                },
              }}
              render={({ field: controllerField, fieldState: { error } }) => (
                field.type === "select" ? (
                  <TextField
                    {...controllerField}
                    select
                    label={field.label}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!error}
                    helperText={error?.message || ""}
                    disabled={field.disabled}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    {...controllerField}
                    label={field.label}
                    type={field.type}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!error}
                    helperText={error?.message || ""}
                    slotProps={field.slotProps}
                    disabled={field.disabled}
                  />
                )
              )}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" className="hover:bg-purple-200">
            {cancelButton}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {submitButton}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GenericFormDialog;
