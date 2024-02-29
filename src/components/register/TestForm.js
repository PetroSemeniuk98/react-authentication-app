import React, { useState } from "react";
// import { supabase } from "../../configSupa/config.Supa";


function TestForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData);
  const handleOnChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      // });

      // if (error) throw error;
      alert("Check your Email!");
    } catch (err) {
      alert("Error 505");
    }
  };
  const signOut = async () => {
    // const { error } = await supabase.auth.signOut();

    // if (error) throw error;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleOnChange} />

        <input type="password" name="password" onChange={handleOnChange} />

        <button type="submit">register</button>
        <button onClick={() => signOut()}>SignOut</button>
      </form>
    </div>
  );
}

export default TestForm;
