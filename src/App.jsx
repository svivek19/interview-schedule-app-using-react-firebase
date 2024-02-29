import React, { useEffect } from "react";
import FormInput from "./component/forms/FormInput";
import FormTextArea from "./component/forms/FormTextArea";
import { useForm } from "react-hook-form";
import FormSelect from "./component/forms/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/index";

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

  useEffect(() => {
    async function getDataFromFirebase() {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });

      if (querySnapshot.docs.length === 0) {
        console.log("no records!");
      }
    }

    getDataFromFirebase();
  }, []);

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

        {/* Display section */}
        <section className="my-10">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
