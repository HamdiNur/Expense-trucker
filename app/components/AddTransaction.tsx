"use client";

import { useRef } from "react";
import addTransaction from "../action/addTransaction";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const formRef=useRef<HTMLFormElement>(null)
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget; // store form reference
  const formData = new FormData(form);

  const { data, error } = await addTransaction(formData);

  if (error) {
    toast.error(error);
  } else {
    toast.success("Transaction Added");
    formRef.current?.reset();
    console.log(data);
    form.reset(); // ✅ use stored form reference
  }
};


  return (
    <>
      <h3>Add Transaction</h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" id="text" name="text" required />
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" step="0.01" required />
        </div>

        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
