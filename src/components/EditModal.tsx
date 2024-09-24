import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Book } from "../types/Book";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditModal({
  book,
  closeModal,
  submit,
}: {
  book: Book;
  closeModal: () => void;
  submit: (input: Book) => void;
}) {
  const formik = useFormik({
    initialValues: { ...book },
    validate: (values) => {
      const errors: {
        title?: string;
      } = {};

      if (!values.title) {
        errors.title = "Title is required";
      } else if (values.title.length < 3) {
        errors.title = "Title should be at least 3 chars.";
      } else if (values.title.length > 255) {
        errors.title = "Title should be 255 charaters at most.";
      }
      return errors;
    },
    onSubmit: (values) => {
      submit(values);
    },
  });

  const handleClose = () => {
    if (formik.dirty) {
      if (
        confirm("Values not saved, are you sure you want to close the modal?")
      )
        closeModal();
    } else {
      closeModal();
    }
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Box pt={2}>
            <TextField
              id="title"
              label="Title"
              name="title"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              fullWidth
            />
          </Box>
          {formik.errors.title && formik.touched.title && (
            <Grid item xs={12}>
              <Typography color="red" fontSize={"small"}>
                {formik.errors.title}
              </Typography>
            </Grid>
          )}
          <Box pt={2}>
            <TextField
              id="author"
              label="Author"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.author}
              fullWidth
            />
          </Box>
          <Box pt={2}>
            <TextField
              id="genre"
              label="Genre"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.genre}
              fullWidth
            />
          </Box>
          <Box pt={2}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box width={1} textAlign="right" pt={2}>
            <Button
              disabled={!formik.isValid || formik.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default EditModal;
