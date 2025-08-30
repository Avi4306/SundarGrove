import { useState } from "react";
import FloatingNavBar from "../Home/FloatingNavBar";
import { motion, AnimatePresence } from "framer-motion";
import { uploadImage } from "../../api/index";
import { useDispatch } from "react-redux";
import { handleCreateReport } from "../../actions/report";

function CreateReport() {
  const dispatch = useDispatch();
  const typeOptions = [
    { value: "cutting", label: "Cutting" },
    { value: "dumping", label: "Dumping" },
    { value: "construction", label: "Construction" },
    { value: "land reclamation", label: "Land Reclamation" },
    { value: "others", label: "Others" },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "cutting",
  });
  const [isOther, setIsOther] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "type") {
      setIsOther(value === "others");
    }
  };

  const handleTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
    setIsOther(value === "others");
    setIsDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = "";

      if (imageFile) {
        const base64 = await convertToBase64(imageFile);
        const { data } = await uploadImage({
          fileData: base64,
          folderName: "reports",
        });
        imageUrl = data.imageUrl;
      }
      await dispatch(handleCreateReport({
        ...formData,
        imageUrl,
      }));

      alert("Report submitted successfully!");
      setFormData({ title: "", description: "", type: "cutting"});
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Error submitting report:", err);
      setError(err?.message || "Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FloatingNavBar />
      <div className="flex flex-col items-center min-h-screen bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center pb-7">
      <div>
        <img src="./src/assets/SG-Logo.png" alt="SundarGrove" className="h-60 mt-10" />
      </div>
      <div className="bg-[rgba(255,255,255,0.7)] shadow-md rounded-xl p-6 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">Create Report</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)]"
            required
          />
          <div className="relative">
            <button
              type="button"
              className="w-full rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)] border-2 border-green-700 text-green-900 font-semibold flex justify-between items-center"
              onClick={() => setIsDropdownOpen((open) => !open)}
            >
              {typeOptions.find(opt => opt.value === formData.type)?.label}
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-10"
                >
                  <ul className="py-1 px-2">
                    {typeOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleTypeSelect(option.value)}
                        className={` rounded-2xl mb-2 py-2 text-gray-800 cursor-pointer hover:bg-green-100 transition-colors duration-200 ${formData.type === option.value ? 'bg-green-100 font-semibold' : ''}`}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)]"
            required={isOther}
          />
          <div className="flex flex-col items-center gap-2">
            <label className="cursor-pointer bg-[rgba(32,87,50,0.75)] text-white px-4 py-2 rounded shadow w-40 flex justify-center items-center hover:bg-[rgba(32,87,50,0.55)] transition">
              Upload Image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-full h-40 object-contain rounded-xl "
              />
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[rgba(32,87,50,0.75)] w-40 text-white px-4 py-2 rounded shadow-lg shadow-green-800/40 hover:bg-[rgba(32,87,50,0.55)] transition transform hover:scale-105 active:scale-95 active:shadow-inner border-b-4 border-green-900"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
        
      </div>
      {error && (
        <div className="w-full max-w-md text-center">
          <p className="text-red-500 mt-3">{error}</p>
        </div>
      )}
      </div>
    </>
  );
}

export default CreateReport;