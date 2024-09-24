import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { Link } from "react-router-dom";

function Edit() {
  return (
    <Box width={1}>
      <Box display={"flex"} alignItems={"center"}>
        <Typography flexGrow={1}>Create / Edit</Typography>
        <Button component={Link} to="/" variant="outlined">
          back to list
        </Button>
      </Box>
      <Box pt={3}>
        <Formik
          initialValues={{
            title: "",
            author: "",
            genre: "",
            description: "",
          }}
          validate={(values) => {
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
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Grid
              container
              component="form"
              onSubmit={handleSubmit}
              spacing={1}
            >
              {errors.title && touched.title && (
                <Grid item xs={12}>
                  <Typography color={"red"}>{errors.title}</Typography>
                </Grid>
              )}

              <Grid item xs={4}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="author"
                  label="Author"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="genre"
                  label="Genre"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.genre}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Box width={1} textAlign="right" py={2}>
                <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              </Box>
            </Grid>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Edit;
