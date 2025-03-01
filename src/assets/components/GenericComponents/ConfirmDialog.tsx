import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';

interface ConfirmDialogProps {
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  title: string;
  description: string;
  confirmationText: string;
  cancellationText: string;
  showDialogActions?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  children,
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmationText,
  cancellationText,
  showDialogActions = true,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{description}</p>
        {children ?? children}
      </DialogContent>
      {showDialogActions && (
        <DialogActions>
          <Button onClick={onConfirm} variant="outlined" color="success">
            {confirmationText}
          </Button>
          <Button onClick={onClose} variant="outlined" color="error">
            {cancellationText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmDialog;
