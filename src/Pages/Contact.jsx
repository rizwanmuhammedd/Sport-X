// import { useState } from "react";

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Contact form submitted:", form);
//     alert("Thank you! Your message has been sent.");
//     setForm({ name: "", email: "", message: "" });
//   };

//   return (
//     <section
//       id="contact"
//       className="w-full bg-gray-50 py-20 px-5 md:px-20 flex justify-center"
//     >
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
//         <h2 className="text-4xl font-extrabold text-sky-600 mb-4 text-center">
//           Contact Us
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           Have questions or suggestions? Send us a message and we'll get back to you as soon as possible.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col">
//             <label htmlFor="name" className="text-gray-700 font-medium mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Your name"
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-gray-700 font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Your email"
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="message" className="text-gray-700 font-medium mb-2">
//               Message
//             </label>
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               placeholder="Your message"
//               rows={5}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-colors"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }
