import React, { useEffect, useState } from "react";
import bg from "../../assets/model.webp";
import Button from "../general/Button";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [disease, setDisease] = useState("");

  const [selectDisease, setSelectDisease] = useState();
  console.log(selectDisease);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://bharatkare.com/wp-json/wp/v2/posts?categories=99"
        );
        setSelectDisease(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Name: name,
      Number: number,
      City: city,
      Diseases: disease,
      Status: "Pending", // Set initial status to "Pending"
    };

    // First, check if the patient already exists in the sheet
    axios
      .get(
        "https://api.sheetbest.com/sheets/cb752eac-5b4d-44bc-9245-87aaf213129d"
      )
      .then((response) => {
        const existingPatients = response.data; // Adjust this based on your response structure
        const patientExists = existingPatients.some(
          (patient) => patient.Name === name
        );
        if (patientExists) {
          alert(`The booking for ${name} has already been done.`);
        } else {
          // If the patient does not exist, proceed with the submission
          axios
            .post(
              "https://api.sheetbest.com/sheets/cb752eac-5b4d-44bc-9245-87aaf213129d",
              data,
              {
                headers: {
                  Authorization:
                    "Bearer 3ilm@8_nceYh!86rPX4@z0q7kcXyMBSD0KRLBbr%obNiTE-dEZYNV$L1Z@necPUT",
                },
              }
            )
            .then((response) => {
              console.log(response);

              // Clear form fields after submission
              setName("");
              setNumber("");
              setCity("");
              setDisease("");
            })
            .catch((error) => {
              console.error("There was an error submitting the form!", error);
            });
          toast.success("Booked Sucessfully");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching existing patients!", error);
      });
  };

  return (
    <div className="bg-blue-50 py-10 mt-[2rem] mb-[3rem]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
        {/* Left Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl font-bold text-blue-900">
            Surgery Matlab BharatKare
          </h1>
          <div className="mt-4 flex space-x-8">
            <div>
              <p className="text-3xl font-bold text-blue-900">400 +</p>
              <p className="text-gray-600">DOCTORS</p>
            </div>
            <div className="line"></div>
            <div>
              <p className="text-3xl font-bold text-blue-900">50 +</p>
              <p className="text-gray-600">DISEASES</p>
            </div>
            <div className="line"></div>
            <div>
              <p className="text-3xl font-bold text-blue-900">45 +</p>
              <p className="text-gray-600">CITIES</p>
            </div>
          </div>
          <div className="mt-6 w-[53%]">
            <a href="tel: +91 8377882115">
              <Button text="Call Us : +91 8377882115" />
            </a>
          </div>
          <p className="mt-4 text-gray-600">
            Book Appointments With Our Expert Doctors Near You
          </p>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              <span className="mr-3">✔</span>
              <span>Get consultation for 50+ diseases across India</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">✔</span>
              <span>
                In-person and online consultation with experienced doctors
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">✔</span>
              <span>
                Extensive medical assistance throughout your treatment
              </span>
            </li>
          </ul>
        </div>

        {/* Middle Section */}
        <div className="model w-[41%]">
          <img className="w-[100%]" src={bg} alt="Surgery illustration" />
        </div>

        {/* Right Section */}
        <div className="homeForm bg-white p-8 rounded-lg shadow-md w-[40%] ml-[5rem]">
          <h2 className="txt-form text-xl font-semibold mb-4">Book Free Consultation</h2>
          <div className=" w-[41%] model1">
            <img className="w-[100%]" src={bg} alt="Surgery illustration" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Patient Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                placeholder="Mobile Number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select City</option>
                <option value="Talegaon-dabhade">Talegaon-dabhade</option>
                <option value="Vadgaon-maval">Vadgaon-maval</option>
                <option value="Dehu">Dehu</option>
                <option value="Khadkale">Khadkale</option>
              </select>
            </div>
            <div>
              <select
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Disease</option>

                {selectDisease?.map((item, index) => {
                  return (
                    <>
                      <option key={index} value={item.slug?.toUpperCase()}>
                        {item.slug?.toUpperCase()}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>

            <div className="form-btn w-[50%]">
              <button type="submit">
                <Button text="Book Now" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
