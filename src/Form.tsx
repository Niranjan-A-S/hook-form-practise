import { useForm } from "react-hook-form";
import "./form.css";

interface IFormValues {
  name: string;
  age: number;
  gender: "Male" | "Female";
  verification: boolean;
  Title: string;
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<IFormValues>({
    defaultValues: {
      name: "Niranjan",
      age: 21,
      gender: "Male",
      verification: false,
    },
  });

  const onSubmit = handleSubmit((data) => console.log({ data }));

  //   console.log(isDirty); //initially false and changes to true on onChange

  //   const { age, gender, name, verification } = watch(); //ONE METHOD
  //   const [name, age, gender, verification] = watch([
  //     "name",
  //     "age",
  //     "gender",
  //     "verification",
  //   ]);

  return (
    <form onSubmit={onSubmit}>
      <label>Name: </label>
      <input
        type={"text"}
        {...register("name", {
          required: "Name is mandatory",
          minLength: {
            value: 3,
            message: "Name should be more than 3 characters ",
          },
          maxLength: {
            value: 20,
            message: "Name should not be more than 20 characters ",
          },
          //   validate: (value) => value === "Niranjan",
        })}
      />
      <sup>{errors.name?.message}</sup>
      <label>Age:</label>
      <input
        type={"number"}
        {...register("age", {
          required: "Age is mandatory",
          min: {
            value: 18,
            message: "Value of age should be more than 18",
          },
          max: {
            value: 60,
            message: "Value of age should be less than 60",
          },
          valueAsNumber: true,
        })}
      />
      <sup>{errors.age?.message}</sup>
      <label>Gender:</label>
      <select {...register("gender")}>
        <option value={"Male"}>Male</option>
        <option value={"Female"}>Female</option>
      </select>
      <select {...register("Title", { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>
      <section>
        <label>Are you a human? </label>
        <input
          type="checkbox"
          {...register("verification", {
            required: "Check the box to proceed",
          })}
        />
        <sup>{errors.verification?.message}</sup>
      </section>
      <button
        type="button"
        onClick={() => {
          setValue("name", "Bill");
          setValue("age", 34);
        }}
      >
        Set Value
      </button>
      <button type="submit">Submit</button>
      <>{}</>
    </form>
  );
};
