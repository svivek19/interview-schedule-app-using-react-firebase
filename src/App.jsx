import React from "react";
import FormInput from "./component/forms/FormInput";
import FormTextArea from "./component/forms/FormTextArea";
import { useForm } from "react-hook-form";
import FormSelect from "./component/forms/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  jobRole: z.string(),
  fullName: z.string().min(3).max(20),
  email: z.string().email(),
  address: z.string().min(15).max(200),
  qualification: z.string().min(10).max(200),
  comments: z.string().min(20).max(100),
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const sendThisToServer = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-amber-500 px-10 py-5 text-center font-semibold">
        Interview Scheduled Candidates
      </header>
      <main className="container mx-auto my-5">
        <section className="bg-white p-5 rounded shadow">
          <h2 className="font-semibold text-lg">
            Interview Scheduled Candidates
          </h2>
          <form
            className="space-y-4 mt-5"
            onSubmit={handleSubmit(sendThisToServer)}
          >
            <FormSelect name="jobRole" register={register("jobRole")} />
            <FormInput
              name="fullName"
              placeholder="Full name"
              register={register("fullName")}
              error={errors.fullName}
            />
            <FormInput
              name="email"
              placeholder="Email"
              register={register("email")}
              error={errors.email}
            />
            <FormTextArea
              name="address"
              placeholder="Address"
              register={register("address")}
              error={errors.address}
            />
            <FormTextArea
              name="qualification"
              placeholder="Qualification"
              register={register("qualification")}
              error={errors.qualification}
            />
            <FormTextArea
              name="comments"
              placeholder="Comments"
              register={register("comments")}
              error={errors.comments}
            />
            <button className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white">
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default App;
