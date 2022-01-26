const validate = (data: { filename: string; width: number; height: number }): { error: string } => {
  if (!data.width || !data.height) {
    return {
      error: 'heigh and width must be numbers',
    };
  }
  if (data.width === 0 || data.height === 0 || data.filename.length === 0) {
    return {
      error: "image should have width and height and filename shouldn't be empty",
    };
  }
  if (data.width < 0 || data.height < 0) {
    return {
      error: 'image width and height must be positive',
    };
  }
  return { error: '' };
};
export default {
  validate,
};
