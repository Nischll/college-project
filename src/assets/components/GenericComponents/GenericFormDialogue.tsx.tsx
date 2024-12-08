import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const GenericFormDialog = ({ open, onClose, onSubmit, title, fields, cancelButton, submitButton, defaultValues }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues || {} 
  });

  const handleFormSubmit = (data) => {
    onSubmit(data); // Pass submitted data back to the parent
    reset(); // Reset the form
    // onClose();
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
              defaultValue={defaultValues?.[field.name] || ""}
              rules={{
                required: field.required && `${field.label} is required`,
                validate: field.validate || undefined,
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
                    {...(field.InputLabelProps && { InputLabelProps: field.InputLabelProps })}
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
