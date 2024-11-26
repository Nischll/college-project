import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const GenericFormDialog = ({ open, onClose, onSubmit, title, fields }) => {
  const { handleSubmit, control, reset } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data); // Pass submitted data back to the parent
    reset(); // Reset the form
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
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
                <TextField
                  {...controllerField}
                  label={field.label}
                  type={field.type}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!error}
                  helperText={error?.message || ""}
                />
              )}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GenericFormDialog;
