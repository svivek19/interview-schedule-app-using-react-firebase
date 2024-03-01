import React, { useEffect, useState } from "react";
import FormInput from "./component/forms/FormInput";
import FormTextArea from "./component/forms/FormTextArea";
import { useForm } from "react-hook-form";
import FormSelect from "./component/forms/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/index";

const formSchema = z.object({
  jobRole: z.string(),
  fullName: z.string().min(3).max(20),
  email: z.string().email(),
  address: z.string().min(3).max(200),
  qualification: z.string().min(3).max(200),
  comments: z.string().min(3).max(100),
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [candidates, setCandidates] = useState([]);

  const sendThisToServer = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "candidates"), data);
      console.log("Document written with ID: ", docRef.id);
      alert("Added as you said!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    reset();
  };

  useEffect(() => {
    async function getDataFromFirebase() {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      setCandidates(querySnapshot.docs.map((doc) => doc.data()));

      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`, doc.data());
      // });

      if (querySnapshot.docs.length === 0) {
        alert("No records exist!");
      }
    }

    getDataFromFirebase();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-10">
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
          <div className="relative overflow-x-auto rounded">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-20">
                    S. No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{candidate.fullName}</td>
                    <td className="px-6 py-4">{candidate.jobRole}</td>
                    <td className="px-6 py-4">{candidate.email}</td>
                    <td className="px-6 py-4">{candidate.address}</td>
                    <td className="px-6 py-4">{candidate.qualification}</td>
                    <td className="px-6 py-4">{candidate.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
