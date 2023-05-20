import * as yup from "yup";

const newProductSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(20, "Title must be less than 20 characters long"),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price must be at least 1")
    .max(100000, "Price must be less than 100000"),
  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters long")
    .max(100, "Description must be less than 100 characters long"),
  categoryId: yup
    .number()
    .required("Category is required")
    .min(1, "Category must be at least 1")
    .max(100, "Category must be less than 100"),
  images: yup
    .array()
    .of(yup.string().required("Image is required"))
});

export type NewProductFormData = yup.InferType<typeof newProductSchema>;
export default newProductSchema;
