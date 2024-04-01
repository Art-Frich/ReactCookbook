import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, DialogContent } from '@mui/material';

const ErrorDialog = (props) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [stringError, setStringError] = useState();

  useEffect(() => {
    setStringError(
      props.error ? (typeof props.error === 'string' ? props.error : JSON.stringify(props.error, null, 2)) : null
    );
  }, [props.error]);

  useEffect(() => {
    if (stringError) {
      const lines = stringError.split('\n');
      setHeight(lines.length);
      setWidth(lines.reduce((a, b) => (a < b ? b : a), 100));
    }
  }, [stringError]);

  return (
    <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.error}>
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <p>
          Something bad happened. The details of the error are below. Please copy them and send them to systems support.
        </p>
        <textarea id="ErrorDialog-error" readOnly style={{ height: height * 14 + 'px', width: width + 'ex' }}>
          {stringError}
        </textarea>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const copyText = document.getElementById('ErrorDialog-error');
            copyText.ariaSelected();
            document.execCommand('copy');
            props.onClose();
          }}>
          Copy Error
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
